jui.defineUI("ui.numberchecker", [ "jquery" ], function($) {

    /**
     * @class ui.numberchecker
     *
     * @extends core
     * @alias NumberChecker
     * @requires jquery
     *
     */
    var UI = function() {
        function validNumberType(value, isInt) {
            var regex = isInt ? /^[-]?\d+$/ : /^[-]?\d+(?:[.]\d+)?$/;

            if(!regex.test(value)) {
                return false;
            }

            return true;
        }

        function getDefaultValue(self) {
            var $element = $(self.root);

            var opts = self.options,
                isInt = opts.integer,
                step = $element.attr("step") || "",
                min = $element.attr("min") || "",
                max = $element.attr("max") || "",
                value = $element.val();

            if(!isInt && step != "any") {
                step = "any";
            } else if(isInt && step == "any") {
                step = "";
            }

            return {
                step: step,
                min: opts.min != null ? opts.min : min,
                max: opts.max != null? opts.max : max,
                value: opts.value != null? opts.value : value
            }
        }

        this.init = function() {
            var element = this.root,
                isInt = this.options.integer,
                empty = this.options.empty,
                message = this.options.message,
                opts = getDefaultValue(this);

            // 초기 값 유효성 검사
            if(validNumberType(opts.value, isInt)) {
                $(element).val(opts.value);
            } else {
                $(element).addClass("invalid").val("").attr("placeholder", message);
            }

            $(element).attr({
                step: opts.step,
                min: opts.min,
                max: opts.max
            });

            // 입력된 값이 유효하면 value를 변경한다. 차후에 유효성 검사 실패시 초기값으로 사용함.
            $(element).on("input", function(e) {
                var value = $(element).val();

                if(validNumberType(value, isInt)) {
                    if(value >= opts.min && value <= opts.max) {
                        opts.value = value;
                    }
                }
            });

            $(element).on("focus", function(e) {
                $(element).removeClass("invalid").attr("placeholder", "");
            });

            $(element).on("focusout", function(e) {
                var value = $(element).val();

                if(!validNumberType(value, isInt)) {
                    if(empty != null) {
                        $(element).val(opts[empty]);
                    } else {
                        $(element).addClass("invalid").val("").attr("placeholder", message);
                    }
                } else {
                    var value = (isInt) ? parseInt(value) : parseFloat(value),
                        min = (isInt) ? parseInt(opts.min) : parseFloat(opts.min),
                        max = (isInt) ? parseInt(opts.max) : parseFloat(opts.max);

                    if(opts.min !== "" && value < min) {
                        $(element).val(min);
                    } else if(opts.max !== "" && value > max) {
                        $(element).val(max);
                    } else {
                        $(element).val(value);
                    }
                }
            });

            return this;
        }
    }

    UI.setup = function() {
        return {
            integer: true,
            empty: null, // min or max or value
            min: null,
            max: null,
            value: null,
            message: "Invalid number"
        };
    }

    return UI;
});