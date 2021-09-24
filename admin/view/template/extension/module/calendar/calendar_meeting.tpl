<div id="meeting-<?php echo $meeting[0]['hall_id'] ?>" class="panel-collapse collapse"></div>
    <div class="row">
        <h4 class="col-lg-2 col-sm-2 col-xs-2 margin-top-10"><?php echo $meeting[0]['meeting_name']; ?></h4>
        <button class="col-lg-2 col-sm-2 col-xs-2 btn btn-primary btn-sm margin-top-10" data-toggle="modal" data-target="#addMeeting" >Редактировать встречу</button>
        <div class="col-lg-4 col-sm-4 col-xs-4 margin-top-10"></div>
        <p class="col-lg-1 col-sm-1 col-xs-1 margin-top-10">Начало</p>
        <b class="well-sm col-lg-1 col-sm-1 col-xs-1"><?php echo $meeting[0]['meeting_time_start']; ?></b>
        <p class="col-lg-1 col-sm-1 col-xs-1 margin-top-10">Конец</p>
        <b class="well-sm col-lg-1 col-sm-1 col-xs-1"><?php echo $meeting[0]['meeting_time_end']; ?></b>
    </div>
    <div class="col-lg-5 guests margin-top-10">
        <div id="accordion" class="panel-group">
            <div class="panel panel-default">
                <div class="panel-heading"><h4 class="panel-title"><a href="#guests-<?php echo $meeting[0]['hall_id'] ?>" data-toggle="collapse">Участники</a></h4></div>
                <div id="guests-<?php echo $meeting[0]['hall_id'] ?>" class="panel-collapse collapse in">
                    <div class="panel-body">
                        <?php foreach ($guests as $guest) { ?>
                            <div class="row margin-top-10">
                                <h5 class="col-lg-5 col-sm-6 col-xs-6 margin-top-10"><?php echo $guest["guest_first_name"] ?> <?php echo $guest["guest_second_name"] ?> <?php echo $guest["guest_third_name"] ?></h5>
                                <button class="col-lg-3 col-sm-4 col-xs-4 btn btn-primary btn-sm edit-guest" value="<?php echo $guest["guest_id"] ?>"  data-toggle="modal" data-target="#addGuest">Редактировать</button>
                                <div class="col-lg-1 col-sm-1 col-xs-1"></div>
                                <button class="col-lg-2 col-sm-2 col-xs-2 btn btn-primary btn-sm delete-guest" value="<?php echo $guest["guest_id"] ?>" id="delete-guest-<?php echo $guest['guest_id'] ?>">Удалить</button>
                                <div class="col-lg-1 col-sm-1 col-xs-1"></div>
                            </div>
                        <?php } ?>
                        <button class="col-lg-6 col-sm-6 col-xs-6 margin-top-40 btn btn-primary add-guest"  data-toggle="modal" data-target="#addGuest">Добавить участника</button>
                        <div  class="col-lg-6 col-sm-6 col-xs-6"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

