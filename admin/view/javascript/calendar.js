$(document).ready(function() {

    //Токен
    let token = $('.token').attr('value');

    //Сегодняшняя дата
    let day = new Date();
    let day1 = day.getDate();
    let month = day.getMonth()+1;
    let year = day.getFullYear();
    if (day<10){day1='0'+day1}
    if (month<10){month='0'+month}

    let today = year + '-' + month + '-' + day1;


    //Аякс для отрисовки залов
    $.ajax({
        url: 'index.php?route=extension/module/calendar/main&token=' + token,
        dataType: 'html',
        data: {day: today},
        success: function (htmlText) {
            showHalls(htmlText);
        }
    });

    //скрипт встречи(перекрасить клетки в зелёный, повесить событие)

    $.ajax({
        url: 'index.php?route=extension/module/calendar/meetingsInfo&token=' + token,
        type: "GET",
        dataType : "json",
        data: {day: today},
        success: function (meetings) {
            refreshMeetings(meetings)
            let openTime = $(".modal-open");
            console.log(openTime)
            openTime.click(function () {
                $('#addMeeting').modal('show');
            });
        }


    });

    function showHalls(htmlText) {
        $('#main-wrap').html(htmlText);
        $.ajax({
            url: 'index.php?route=extension/module/calendar/getHalls&token=' + token,
            type: "GET",
            dataType: "json",
            data: {day: today},
            success: function (halls) {
                let hallsCount = $('.halls-count').attr('value');
                let hall = 1;
                //стили и события на строку времени
                while (hall <= (hallsCount)) {
                    let hallId = halls[hall - 1].hall_id;
                    //какое время до начала работы будет закрыто
                    let startWorkTime = halls[hall - 1].hall_time_start;
                    let startWorkFirstPart = startWorkTime.slice(0, 2) * 2;
                    let startWorkSecondPart = startWorkTime.slice(3, 5)
                    let startWork = startWorkFirstPart;
                    if (startWorkSecondPart === '30') {
                        startWork += 1;
                    }
                    // какое время после окончания работы будет закрыто
                    let endWorkTime = halls[hall - 1].hall_time_end;
                    let endWorkFirstPart = endWorkTime.slice(0, 2) * 2;
                    let endWorkSecondPart = endWorkTime.slice(3, 5)
                    let endWork = endWorkFirstPart;
                    if (endWorkSecondPart === '30') {
                        endWork += 1;
                    }
                    //клетки на которые нужно будет повесить стили для закрытия
                    let closedOf = $(".time-line-" + hallId + " th:nth-child(-n+" + startWork + ")");
                    let closedTo = $(".time-line-" + hallId + " th:nth-child(n+" + (endWork + 1) + ")");

                    // стили на закрытые часы
                    closedOf.css("background-color", "red");
                    closedOf.css("cursor", "default");
                    closedTo.css("background-color", "red");
                    closedTo.css("cursor", "default");

                    //стили и событие на свободные часы
                    let openClasses = $(".time-line-" + hallId + " th:nth-child(n+" + (startWork + 1) + "):nth-child(-n+" + endWork + ")");
                    openClasses.addClass('modal-open');
                    $("#delete-hall-" + hallId).click(function (){
                        $.ajax({
                            url: 'index.php?route=extension/module/calendar/deleteHall&token=' + token,
                            type: 'POST',
                            data: {hallId: hallId},
                            success: function () {
                                refreshDate()
                            }
                        })
                    })
                    $("#edit-hall-" + hallId).click(function (){
                        $.ajax({
                            url: 'index.php?route=extension/module/calendar/getHall&token=' + token,
                            type: 'GET',
                            dataType: "json",
                            data: {hallId: hallId},
                            success: function (hall) {
                                let Name = $('#inputHallName');
                                let TimeStart = $('#inputStartTime');
                                let TimeEnd = $('#inputEndTime');
                                Name.val(hall[0].hall_name);
                                TimeStart.val(hall[0].hall_time_start);
                                TimeEnd.val(hall[0].hall_time_end);
                                $('.save-hall').unbind('click')

                                $('.save-hall').click(function (){
                                    let hallName = $('#inputHallName').val();
                                    let hallTimeStart = $( "#inputStartTime option:selected" ).val();
                                    let hallTimeEnd = $( "#inputEndTime option:selected" ).val();

                                    $.ajax({
                                        url: 'index.php?route=extension/module/calendar/editHall&token=' + token,
                                        type: 'POST',
                                        data: {hallName: hallName, hallTimeStart: hallTimeStart, hallTimeEnd: hallTimeEnd, hallId: hallId},
                                        success: function () {
                                            $('#addHall').modal('hide');
                                            $('.save-hall').unbind('click');
                                            refreshDate()
                                        }
                                    })
                                })
                            }
                        })
                    })
                    hall += 1
                }
                // Пишем дату
                $('#choose-date').val(today);

                // Обновление встреч по выбранной дате
                let refresh = $('#refresh-date');
                refresh.click( function (){
                    refreshDate()
                });

            }
        });
    }


    function refreshMeetings(meetings) {
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


            //Получение id зала и подключение стилей ко встречам
            let meetingHall= meetings[meeting].hall_id;
            let meetingTime = $(".time-line-" + meetingHall + " th:nth-child(n+" + (startMeeting + 1) + "):nth-child(-n+" + endMeeting + ")");
            meetingTime.css("background-color", "green").css("border-color", "green");
            meetingTime.addClass("open-window-" + meetings[meeting].meeting_id);
            meetingTime.removeClass('modal-open');

            //удаляем вызов окна для добавления встречи
            let openWindow = $(".open-window-5");// + meetings[meeting].meeting_id
            openWindow.unbind('click');

            //Загрузка списка участников встреч по клику на встречу
            meetingTime.click(function(){
                $.ajax({
                    url: 'index.php?route=extension/module/calendar/meetingsGuests&token=' + token,
                    dataType: 'html',
                    data: {meetingId: meetingId},
                    success: function (htmlText) {
                        //отрисовка встречи(данные)
                        $('.meeting-body-' + meetingHall).html(htmlText);
                        // при клике на встречу вешаем событие при клике на кнопку Добавить участника для передачи id встречи чтобы добавлять участника именно в эту встречу
                        $('.add-guest').click(function () {
                            $('.save-guest').click(function () {
                                let guestFirstName = $('#inputFirstName').val();
                                let guestSecondName = $('#inputSecondName').val();
                                let guestThirdName = $('#inputLastName').val();
                                $('#addGuest').modal('hide');
                                $.ajax({
                                    url: 'index.php?route=extension/module/calendar/addGuest&token=' + token,
                                    type: 'POST',
                                    data: {guestFirstName: guestFirstName, guestSecondName: guestSecondName, guestThirdName: guestThirdName, meetingId: meetingId},
                                    success: function () {
                                        $.ajax({
                                            url: 'index.php?route=extension/module/calendar/meetingsGuests&token=' + token,
                                            dataType: 'html',
                                            data: {meetingId: meetingId},
                                            success: function (htmlText) {
                                                //отрисовка встречи(данные)
                                                $('.meeting-body-' + meetingHall).html(htmlText);
                                            }
                                        });
                                    }
                                })
                            })
                        })
                        $('.edit-guest').click(function () {
                            let guestEditId = $(this).val();
                            $.ajax({
                                url: 'index.php?route=extension/module/calendar/getGuest&token=' + token,
                                type: 'GET',
                                dataType: "json",
                                data: {guestEditId: guestEditId},
                                success: function (guest) {
                                    let firstName = $('#inputFirstName');
                                    let secondStart = $('#inputSecondName');
                                    let thirdEnd = $('#inputLastName');
                                    firstName.val(guest[0].guest_first_name);
                                    secondStart.val(guest[0].guest_second_name);
                                    thirdEnd.val(guest[0].guest_third_name);
                                    $('.save-guest').unbind('click')

                                    $('.save-guest').click(function () {
                                        let guestFirstName = $('#inputFirstName').val();
                                        let guestSecondName = $('#inputSecondName').val();
                                        let guestThirdName = $('#inputLastName').val();
                                        $('#addGuest').modal('hide');
                                        $.ajax({
                                            url: 'index.php?route=extension/module/calendar/editGuest&token=' + token,
                                            type: 'POST',
                                            data: {guestFirstName: guestFirstName, guestSecondName: guestSecondName, guestThirdName: guestThirdName, meetingId: meetingId},
                                            success: function () {
                                                $.ajax({
                                                    url: 'index.php?route=extension/module/calendar/meetingsGuests&token=' + token,
                                                    dataType: 'html',
                                                    data: {meetingId: meetingId},
                                                    success: function (htmlText) {
                                                        //отрисовка встречи(данные)
                                                        $('.meeting-body-' + meetingHall).html(htmlText);
                                                    }
                                                });
                                            }
                                        })
                                    })
                                }
                            })
                        })
                        $('.delete-guest').click(function () {
                            let guestId = $(this).val();
                            $.ajax({
                                url: 'index.php?route=extension/module/calendar/deleteGuest&token=' + token,
                                type: 'POST',
                                data: {guestId: guestId},
                                success: function () {
                                    console.log(meetingId)
                                    $.ajax({
                                        url: 'index.php?route=extension/module/calendar/meetingsGuests&token=' + token,
                                        dataType: 'html',
                                        data: {meetingId: meetingId},
                                        success: function (htmlText) {
                                            $('.meeting-body-' + meetingHall).html(htmlText);

                                        }
                                    });
                                }
                            });
                        })
                    }
                });
            });

            meeting +=1;
        }
    }


    function refreshDate() {
        let date = new Date($('#choose-date').val());
        let day = date.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        let month = date.getMonth() + 1;
        if (month < 10 ) {
            month = '0' + month;
        }
        let year = date.getFullYear();
        day = ([year, month, day].join('-'));
        today = day

        $.ajax({
            url: 'index.php?route=extension/module/calendar/main&token=' + token,
            dataType: 'html',
            data: {day: today},
            success: function (htmlText) {
                showHalls(htmlText);
            }
        });

        $.ajax({
            url: 'index.php?route=extension/module/calendar/meetingsInfo&token=' + token,
            type: "GET",
            dataType : "json",
            data: {day: today},
            success: function (meetings) {
                refreshMeetings(meetings)
            }
        });



    }

    $('.save-hall').click(function (){
        let hallName = $('#inputHallName').val();
        let hallTimeStart = $( "#inputStartTime option:selected" ).val();
        let hallTimeEnd = $( "#inputEndTime option:selected" ).val();

        $.ajax({
            url: 'index.php?route=extension/module/calendar/saveHall&token=' + token,
            type: 'POST',
            data: {hallName: hallName, hallTimeStart: hallTimeStart, hallTimeEnd: hallTimeEnd},
            success: function () {
                $('#addHall').modal('hide');
                refreshDate()
           }
        })
    })

    $('.save-meeting').click(function (){
        let meetingName = $('#inputMeetingName').val();
        let meetingTimeStart = $( "#inputMeetingStart option:selected" ).val();
        let meetingTimeEnd = $( "#inputMeetingEnd option:selected" ).val();
        let meetingRepeat = $('#inputRepeatName option:selected').val();

        let meetingDateEnd = new Date($('#dateRepeat').val());
        let end = meetingDateEnd.getDate();
        if (end < 10) {
            end = '0' + end;
        }
        let month = meetingDateEnd.getMonth() + 1;
        if (month < 10 ) {
            month = '0' + month;
        }
        let year = meetingDateEnd.getFullYear();
        day = ([year, month, end].join('-'));
        console.log(meetingName, day, meetingTimeStart, meetingTimeEnd, meetingRepeat)



        //$.ajax({
        //    url: 'index.php?route=extension/module/calendar/saveMeeting&token=' + token,
        //    type: 'POST',
        //     data: {meetingName: meetingName, meetingTimeStart: meetingTimeStart, meetingTimeEnd: meetingTimeEnd, meetingRepeat: meetingRepeat, day: day},
        //    success: function () {
        //        $('#addMeeting').modal('hide');
        //       refreshDate()
        //   }
        //})


    })
});



