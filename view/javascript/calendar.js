$(document).ready(function() {

    //Токен
    let token = $('.token').attr('value');

    //Сегодняшняя дата
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth()+1;
    let year = today.getFullYear();
    if (day<10){day='0'+day}
    if (month<10){month='0'+month}

    today = year + '-' + month + '-' + day;
    $('.date').val(today);


    //Аякс для отрисовки залов
    $.ajax({
        url: 'index.php?route=extension/module/calendar/main&token=' + token,
        dataType: 'html',
        data: {day: today},
        success: function (htmlText) {
            $('#main-wrap').html(htmlText);
            let hallsCount = $('.halls-count').attr('value');
            let hall = 1;
            //стили и события на строку времени
            while (hall <= hallsCount) {
                //какое время до начала работы будет закрыто
                let startWorkTime = $(".hall-time-start-" + hall).attr('value');
                let startWorkFirstPart = startWorkTime.slice(0,2) * 2;
                let startWorkSecondPart = startWorkTime.slice(3,5)
                let startWork = startWorkFirstPart;
                if(startWorkSecondPart === '30') {
                    startWork +=1;
                }
                // какое время после окончания работы будет закрыто
                let endWorkTime = $(".hall-time-end-" + hall).attr('value');
                let endWorkFirstPart = endWorkTime.slice(0,2) * 2;
                let endWorkSecondPart = endWorkTime.slice(3,5)
                let endWork = endWorkFirstPart;
                if(endWorkSecondPart === '30') {
                    endWork +=1;
                }
                //клетки на которые нужно будет повесить стили для закрытия
                let closedOf = $(".time-line-" + hall +" th:nth-child(-n+" + (startWork - 1) +")");
                let closedTo = $(".time-line-" + hall +" th:nth-child(n+" + (endWork - 1) +")");

                // стили на закрытые часы
                closedOf.css("background-color", "red");
                closedOf.css("cursor", "default");
                closedTo.css("background-color", "red");
                closedTo.css("cursor", "default");

                //стили и событие на свободные часы
                let openClasses = $(".time-line-" + hall +" th:nth-child(n+" + startWork + "):nth-child(-n+" + (endWork - 2) + ")");
                openClasses.addClass('modal-open');
                let openTime = $(".modal-open");
                openTime.click(function(){
                    $('#addMeeting').modal('show');
                });
                hall+=1
            }
        }
    })



    //скрипт встречи(перекрасить клетки в зелёный, повесить событие)

    $.ajax({
        url: 'index.php?route=extension/module/calendar/meetingsInfo&token=' + token,
        type: "GET",
        dataType : "json",
        data: {day: today},
        success: function (meetings) {
            let count = meetings.length;
            let meeting = 0;
            while (meeting <= count) {
                // времени начала встречи
                let meetingId = meetings[meeting].meeting_id;

                let startMeetingTime = meetings[meeting].meeting_time_start;
                let startMeetingFirstPart = startMeetingTime.slice(0,2) * 2;
                let startMeetingSecondPart = startMeetingTime.slice(3,5);
                let startMeeting = startMeetingFirstPart;
                if(startMeetingSecondPart === '30') {
                    startMeeting +=1;
                }
                //Время окончания встречи
                let endMeetingTime = meetings[meeting].meeting_time_end;
                let endMeetingFirstPart = endMeetingTime.slice(0,2) * 2;
                let endMeetingSecondPart = endMeetingTime.slice(3,5);
                let endMeeting = endMeetingFirstPart;
                if(endMeetingSecondPart === '30') {
                    endMeeting +=1;
                }

                //Получение id зала и подключение стилей ко времени встречи
                let meetingHall= meetings[meeting].hall_id;
                let meetingTime = $(".time-line-" + meetingHall + " th:nth-child(n+" + (startMeeting + 1) + "):nth-child(-n+" + endMeeting + ")");
                meetingTime.css("background-color", "green").css("border", "none");
                meetingTime.addClass("open-window" + meetings[meeting].meeting_id);
                meetingTime.off('click');

                //удаляем вызов окна для добавления встречи
                let openWindow = $(".open-window");
                openWindow.unbind('click');

                //Загрузка списка участников встреч по клику на встречу
                meetingTime.click(function(){
                    $.ajax({
                        url: 'index.php?route=extension/module/calendar/meetingsGuests&token=' + token,
                        dataType: 'html',
                        data: {meetingId: meetingId},
                        success: function (htmlText) {
                            $('.meeting-body-' + meetingHall).html(htmlText);
                        }
                    });
                });

                meeting +=1;
            }
        }
    });





    //

    //$('.save-hall').submit(function (e){
    //    e.preventDefault();
    //    let hallName = $('#inputHallName').attr('value');
    //    let hallTimeStart = $('#inputStartTime').attr('value');
    //    let hallTimeEnd = $('#inputEndTime').attr('value');
    //    console.log(hallName);
    //    console.log(hallTimeStart);
    //    console.log(hallTimeEnd);

        //$.ajax({
        //    url: 'index.php?route=extension/module/calendar/saveHall&token=' + token,
        //    type: 'POST',
        //    data: ,
        //    success: function () {
        //        alert('Успешно');
        //   }
        //})
    //})
});



