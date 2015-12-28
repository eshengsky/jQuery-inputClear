/**
 * Created by Sky on 2015/12/22.
 */
;
+function ($, window, document) {

    var PLUGIN_NAME = 'inputClear',
        VERSION = '1.0.0',
        DEFAULTS = {
            show: 'always',
            title: 'clear',
            callback: function ($input) {
                $input.val('');
                $input.focus();
            }
        };

    function Plugin(element, options) {
        this.$input = $(element);
        this.options = options;
        this._init();
    }

    Plugin.prototype = {
        _init: function () {
            var that = this,
                show = this.options.show,
                title = this.options.title,
                callback = this.options.callback,
                wrap,
                btn,
                display = '';
            that.$input.wrap('<div class="input_clear_wrap"></div>');
            wrap = that.$input.parent('.input_clear_wrap');

            switch (show) {
                case 'hover':
                    display = 'style="display:none;"';
                    break;
                case 'focus':
                    display = 'style="display:none;"';
                    break;
            }
            $(wrap).append('<button class="input_clear_btn" type="button" title="' + title + '" ' + display + '><span>×</span></button>');

            btn = $(wrap).find('button.input_clear_btn');

            var cloneStyles = [
                'background-color',
                'background-image',
                'border-top-width',
                'border-top-style',
                'border-top-color',
                'border-top-left-radius',
                'border-top-right-radius',
                'border-bottom-width',
                'border-bottom-style',
                'border-bottom-color',
                'border-bottom-left-radius',
                'border-bottom-right-radius',
                'border-left-width',
                'border-left-style',
                'border-left-color',
                'border-right-width',
                'border-right-style',
                'border-right-color',
                'box-shadow',
                'font-size',
                'font-family',
                'width',
                'height',
                'line-height',
                'display',
                'position',
                'top',
                'right',
                'bottom',
                'left',
                'margin-top',
                'margin-right',
                'margin-bottom',
                'margin-left',
                'padding-top',
                'padding-right',
                'padding-bottom',
                'padding-left',
                'transition-delay',
                'transition-duration',
                'transition-property',
                'transition-timing-function'
            ];

            for (var i = 0; i < cloneStyles.length; i++) {
                $(wrap).css(cloneStyles[i], that._getOriginalStyle(that.$input[0], cloneStyles[i]));
            }

            var input_display = that.$input.css('display');
            if (input_display == 'block') {
                that.$input.css('display', 'inline-block');
            }
            var btn_width = $(btn).css('width');
            var input_width = that._getOriginalStyle(that.$input[0], 'width');
            var input_bl_width = that._getOriginalStyle(that.$input[0], 'border-left-width');
            var input_br_width = that._getOriginalStyle(that.$input[0], 'border-right-width');
            if (input_width.indexOf('%') >= 0) {
                var cal = 'calc(' + input_width + ' - ' + input_bl_width + ' - ' + input_br_width + ' - ' + btn_width + ')';
                that.$input.css('width', cal);
            } else {
                that.$input.css('width', (parseInt(input_width) - parseInt(input_bl_width) - parseInt(input_br_width) - parseInt(btn_width)) + 'px');
            }

            that.$input.css('height', 'auto');
            that.$input.css('border', 'none');
            that.$input.css('box-shadow', 'none');
            that.$input.css('transition', 'none');
            that.$input.css('position', 'relative');
            that.$input.css('margin', '0');
            that.$input.css('padding', '0');

            that.$input.on('focus', function () {
                $(wrap).addClass('input_clear_focus');
                if(show == 'focus'){
                    //$(btn).show();
                    setTimeout(function(){
                        $(btn).show();
                    },150);
                }
            });

            that.$input.on('blur', function () {
                $(wrap).removeClass('input_clear_focus');
                if(show == 'focus'){
                    setTimeout(function(){
                        $(btn).hide();
                    },150);
                }
            });

            $(btn).on('click', function () {
                callback(that.$input);
            });

            if(show == 'hover'){
                $(wrap).on('mouseenter',function(){
                    $(btn).show();
                });

                $(wrap).on('mouseleave',function(){
                    $(btn).hide();
                })
            }
        },
        _getOriginalStyle: function (element, prop) {
            var parent = element.parentNode,
                computedStyle = getComputedStyle(element),
                display = parent.style.display,
                value;
            parent.style.display = 'none';
            value = computedStyle.getPropertyValue(prop);
            parent.style.display = display;
            return value;
        }
    };

    function fn(option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('plugin_' + PLUGIN_NAME);
            var options = $.extend({}, DEFAULTS, $this.data(), typeof option == 'object' && option)

            if (!data) $this.data('plugin_' + PLUGIN_NAME, (data = new Plugin(this, options)))
            if (typeof option == 'string') data[option]();
        });
    }

    $.fn[PLUGIN_NAME] = fn;
    $.fn[PLUGIN_NAME].Constructor = Plugin;

}(jQuery, window, document);
