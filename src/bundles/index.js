import $ from 'jquery'
import jui from '../main.js'
import TimepickerComp from '../components/timepicker.js'
import Styles from './index.less'

jui.use(TimepickerComp);

jui.ready([ "ui.timepicker" ], function(timepicker) {
    var ui_date = timepicker("#timepicker_date");
    var ui_time = timepicker("#timepicker_time");
});