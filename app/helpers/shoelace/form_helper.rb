# frozen_string_literal: true

module Shoelace
  module FormHelper
    class ShoelaceInputField < ActionView::Helpers::Tags::TextField
      attr_reader :field_type

      def initialize(field_type, *args)
        super(*args)
        @field_type = field_type
      end

      def render(&block)
        options = @options.stringify_keys

        value = options.fetch("value") { value_before_type_cast }
        options["value"] = value if value.present?

        options["size"] = options["maxlength"] unless options.key?("size")
        options["type"] ||= field_type
        options["invalid"] = options.fetch("invalid") { @object.errors[@method_name].presence }
        add_default_name_and_id(options)

        @template_object.content_tag('sl-input', '', options, &block)
      end
    end

    class ShoelaceColorPicker < ActionView::Helpers::Tags::ColorField
      def field_type; nil; end

      def tag(tag_name, *args, &block)
        tag_name.to_s == 'input' ? content_tag('sl-color-picker', '', *args, &block) : super
      end
    end

    class ShoelaceRange < ActionView::Helpers::Tags::NumberField
      def field_type; nil; end

      def tag(tag_name, *args, &block)
        tag_name.to_s == 'input' ? content_tag('sl-range', '', *args, &block) : super
      end
    end

    class ShoelaceSwitch < ActionView::Helpers::Tags::TextField
      def field_type; nil; end

      def render(&block)
        options = @options.stringify_keys
        options["value"] = options.fetch("value") { value_before_type_cast }
        add_default_name_and_id(options)

        @template_object.content_tag('sl-switch', @method_name.to_s.humanize, options, &block)
      end
    end

    class ShoelaceTextArea < ActionView::Helpers::Tags::TextArea
      def content_tag(tag_name, content, options)
        options[:value] = content if content.present?

        tag_name.to_s == 'textarea' ? super('sl-textarea', '', options) : super
      end
    end

    class ShoelaceSelect < ActionView::Helpers::Tags::Select
      def grouped_options_for_select(grouped_options, options)
        @template_object.grouped_sl_options_for_select(grouped_options, options)
      end

      def options_for_select(container, options = nil)
        @template_object.sl_options_for_select(container, options)
      end

      def select_content_tag(option_tags, _options, html_options)
        html_options = html_options.stringify_keys
        add_default_name_and_id(html_options)

        @template_object.content_tag("sl-select", option_tags, html_options)
      end
    end

    class ShoelaceCollectionSelect < ActionView::Helpers::Tags::CollectionSelect
      def options_from_collection_for_select(collection, value_method, text_method, selected = nil)
        @template_object.sl_options_from_collection_for_select(collection, value_method, text_method, selected)
      end

      def select_content_tag(option_tags, _options, html_options)
        html_options = html_options.stringify_keys
        add_default_name_and_id(html_options)

        @template_object.content_tag("sl-select", option_tags, html_options)
      end
    end

    class ShoelaceCheckBox < ActionView::Helpers::Tags::CheckBox
      def render(&block)
        options = @options.stringify_keys
        options["value"]   = @checked_value
        options["checked"] = true if input_checked?(options)

        if options["multiple"]
          add_default_name_and_id_for_value(@checked_value, options)
          options.delete("multiple")
        else
          add_default_name_and_id(options)
        end

        if block_given?
          @template_object.content_tag('sl-checkbox', '', options, &block)
        else
          @template_object.content_tag('sl-checkbox', @method_name.to_s.humanize, options)
        end
      end
    end

    class ShoelaceFormBuilder < ActionView::Helpers::FormBuilder
      {
        email: :email,
        number: :number,
        password: :password,
        search: :search,
        telephone: :tel,
        phone: :tel,
        text: :text,
        url: :url
      }.each do |field_type, field_class|
        # def email_field(method, **options, &block)
        #   ShoelaceInputField.new(:email, object_name, method, @template, options.with_defaults(label: method.to_s.humanize)).render(&block)
        # end
        eval <<-RUBY, nil, __FILE__, __LINE__ + 1
          def #{field_type}_field(method, **options, &block)
            ShoelaceInputField.new(:#{field_class}, object_name, method, @template, options.with_defaults(object: @object, label: method.to_s.humanize)).render(&block)
          end
        RUBY
      end

      def color_field(method, **options)
        ShoelaceColorPicker.new(object_name, method, @template, options.with_defaults(object: @object, value: "#ffffff")).render
      end
      alias color_picker color_field

      def range_field(method, **options)
        ShoelaceRange.new(object_name, method, @template, options.with_defaults(object: @object)).render
      end
      alias range range_field

      def switch_field(method, **options, &block)
        ShoelaceSwitch.new(object_name, method, @template, options.with_defaults(object: @object)).render(&block)
      end
      alias switch switch_field

      def text_area(method, **options)
        ShoelaceTextArea.new(object_name, method, @template, options.with_defaults(object: @object, resize: 'auto')).render
      end

      def check_box(method, options = {}, checked_value = "1", unchecked_value = "0", &block)
        ShoelaceCheckBox.new(object_name, method, @template, checked_value, unchecked_value, options.merge(object: @object)).render(&block)
      end

      def select(method, choices = nil, options: {}, html: {}, &block)
        ShoelaceSelect.new(object_name, method, @template, choices, options.with_defaults(object: @object), html, &block).render
      end

      def collection_select(method, collection, value_method, text_method, options: {}, html: {}, &block)
        ShoelaceCollectionSelect.new(object_name, method, @template, collection, value_method, text_method, options.with_defaults(object: @object), html, &block).render
      end

      def submit(value = nil, options = {})
        value, options = nil, value if value.is_a?(Hash)

        @template.sl_submit_tag(value || submit_default_value, **options)
      end
    end

    DEFAULT_FORM_PARAMETERS = {
      builder: ShoelaceFormBuilder,
      data: {
        remote: true,
      }
    }

    DIVIDER_TAG = "<sl-menu-divider></sl-menu-divider>".html_safe
    OPENING_SL_FORM_TAG = '<sl-form'.html_safe
    CLOSING_SL_FORM_TAG = '</sl-form>'.html_safe

    private_constant :DEFAULT_FORM_PARAMETERS, :DIVIDER_TAG, :OPENING_SL_FORM_TAG, :CLOSING_SL_FORM_TAG

    def sl_form_for(*args, **options, &block)
      content = form_for(*args, **DEFAULT_FORM_PARAMETERS.deep_merge(options), &block)
      content[0, 5]  = OPENING_SL_FORM_TAG
      content[-7, 7] = CLOSING_SL_FORM_TAG
      content
    end

    def sl_form_with(**args, &block)
      content = form_with(**args, **DEFAULT_FORM_PARAMETERS.except(:data), &block)
      content[0, 5]  = OPENING_SL_FORM_TAG
      content[-7, 7] = CLOSING_SL_FORM_TAG
      content
    end

    def sl_form_tag(url_for_options = {}, options = {}, &block)
      content = form_tag(url_for_options, options.with_defaults(DEFAULT_FORM_PARAMETERS.except(:builder)), &block)
      content[0, 5]  = OPENING_SL_FORM_TAG
      content[-7, 7] = CLOSING_SL_FORM_TAG
      content
    end

    # Creates a generic button element.
    def sl_button_tag(**attrs, &block)
      content_tag("sl-button", **attrs, &block)
    end

    # Not providing this helper for now due to potentially untraceable HTML. E.g.
    #
    #   <a href="...">
    #     <sl-button>...</sl-button>
    #   </a>
    #
    # May be trackable and traceable by search bots and scrapers, but <sl-button href="...">...</sl-button> may not be.
    #
    # In the mean time, it is advisable to wrap a <sl-button> tag with an <a> tag.
    #
    # def sl_button_to(href, **attrs, &block)
    #   sl_button_tag(href: href, **attrs, &block)
    # end

    # Creates a submit button with the text value as the caption, with the +submit+ attribute.
    def sl_submit_tag(value = 'Save changes', **options)
      options = options.deep_stringify_keys
      tag_options = { "submit" => true, "type" => "primary" }.update(options)
      set_default_disable_with(value, tag_options)

      content_tag('sl-button', value, tag_options)
    end

    # Creates a shoelace text field; use these text fields to input smaller chunks of text like a username or a search query.
    #
    # For the properties available on this tag, please refer to the official documentation:
    #   https://shoelace.style/components/input?id=properties
    #
    def sl_text_field_tag(name, value = nil, **options, &block)
      content_tag('sl-input', '', { "type" => "text", "name" => name, "id" => sanitize_to_id(name), "value" => value }.update(options.stringify_keys), &block)
    end

    def grouped_sl_options_for_select(grouped_options, options)
      body = "".html_safe

      grouped_options.each_with_index do |container, index|
        label, values = container

        body.safe_concat(DIVIDER_TAG) if index > 0
        body.safe_concat(content_tag("sl-menu-label", label)) if label.present?
        body.safe_concat(sl_options_for_select(values, options))
      end

      body
    end

    def sl_options_for_select(container, options = nil)
      return container if String === container

      selected, disabled = extract_selected_and_disabled(options).map { |r| Array(r).map(&:to_s) }

      container.map do |element|
        html_attributes = option_html_attributes(element)
        text, value = option_text_and_value(element).map(&:to_s)

        html_attributes[:checked] ||= selected.include?(value)
        html_attributes[:disabled] ||= disabled.include?(value)
        html_attributes[:value] = value

        tag_builder.content_tag_string('sl-menu-item', text, html_attributes)
      end.join("\n").html_safe
    end

    def sl_options_from_collection_for_select(collection, value_method, text_method, selected = nil)
      options = collection.map do |element|
        [value_for_collection(element, text_method), value_for_collection(element, value_method), option_html_attributes(element)]
      end

      selected, disabled = extract_selected_and_disabled(selected)

      select_deselect = {
        selected: extract_values_from_collection(collection, value_method, selected),
        disabled: extract_values_from_collection(collection, value_method, disabled)
      }

      sl_options_for_select(options, select_deselect)
    end

    {
      email: :email,
      number: :number,
      password: :password,
      search: :search,
      telephone: :tel,
      phone: :tel,
      url: :url
    }.each do |field_type, field_class|
      # def sl_email_field_tag(method, **options, &block)
      #   sl_text_field_tag(name, value, options.merge(type: :email))
      # end
      eval <<-RUBY, nil, __FILE__, __LINE__ + 1
        # Creates a text field of type “#{field_type}”.
        def sl_#{field_type}_field_tag(method, **options, &block)
          sl_text_field_tag(name, value, options.merge(type: :#{field_class}))
        end
      RUBY
    end
  end
end
