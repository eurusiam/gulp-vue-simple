var width_size = 768;

$(function () {
    updateContainer();
    $(window).resize(function () {
        updateContainer();
    });
});

function updateContainer() {
    var $containerHeight = $(window).width();
    if ($containerHeight <= width_size) {
        var clock = new FlipClock($('.your-clock'), 180, {
            countdown: true,
            clockFace: 'MinuteCounter', //DailyCounter | HourlyCounter | MinuteCounter | TwelveHourClock | TwentyFourHourClock | Counter
            language: 'no',
        });

    }
    if ($containerHeight > width_size + 1) {
        var clocks = new FlipClock($('.your-clock'), 180, {
            countdown: true,
            clockFace: 'HourlyCounter', //DailyCounter | HourlyCounter | MinuteCounter | TwelveHourClock | TwentyFourHourClock | Counter
            language: 'no',
        });

    }
}

// console.log("size ok");

//=============  綁定問題 =======
// https://stackoverflow.com/questions/9828831/jquery-on-window-resize
//====================


$(function () {

    $("#btn_all").click(function () {
        $(".millon .lotteryNumbericon").each(function () {
            $(this).addClass('focus');
        });
    });
    // console.log("btn ok");
    $("#clear_all").click(function () {
        $(".millon .lotteryNumbericon").each(function () {
            $(this).removeClass('focus');
        });
    });
    // console.log("btn ok");



});