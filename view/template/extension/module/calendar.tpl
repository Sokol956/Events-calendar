<?php echo $header; ?><?php echo $column_left; ?>
<div id="content">
    <div class="page-header">
        <div class="container-fluid">
            <h1><?php echo $heading_title; ?></h1>
            <ul class="breadcrumb">
                <?php foreach ($breadcrumbs as $breadcrumb) { ?>
                <li><a href="<?php echo $breadcrumb['href']; ?>"><?php echo $breadcrumb['text']; ?></a></li>
                <?php } ?>
            </ul>
        </div>
        <div class="container-fluid">
            <?php if ($error_warning) { ?>
            <div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i> <?php echo $error_warning; ?>
                <button type="button" class="close" data-dismiss="alert">&times;</button>
            </div>
            <?php } ?>
            <div class="testing"></div>
            <div id="main-wrap" class="panel panel-default"></div>
        </div>
    </div>
</div>
<?php echo $footer; ?>
<div class="modal fade" id="addHall" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-window">
        <div class="modal-content ">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">Добавление/редактирование зала</h4>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="inputHallName" class="control-label col-xs-2 margin-top-10">Название</label>
                    <div class="col-xs-10 ">
                        <input type="text" class="form-control" id="inputHallName" placeholder="Название ">
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputStartTime" class="control-label col-xs-2 margin-top-10">Начало работы</label>
                    <select  class="form-control" id="inputStartTime">
                        <option  label = "00:00:00">
                        <option  label = "00:30:00">
                        <?php for ($i = 1; $i <= 9; $i++) { ?>
                        <option  label = "0<?php echo $i ?>:00:00">
                        <option  label = "0<?php echo $i ?>:30:00">
                        <?php } ?>
                        <?php for ($i = 10; $i <= 23; $i++) { ?>
                        <option  label = "<?php echo $i ?>:00:00">
                        <option  label = "<?php echo $i ?>:30:00">
                        <?php } ?>
                    </select>
                </div>
                <div class="form-group margin-top-10">
                    <label for="inputEndTime" class="control-label col-xs-2 margin-top-10">Конец работы</label>
                    <select class="form-control" id="inputEndTime">
                        <option  label = "00:00:00">
                        <option  label = "00:30:00">
                        <?php for ($i = 1; $i <= 9; $i++) { ?>
                        <option  label = "0<?php echo $i ?>:00:00">
                        <option  label = "0<?php echo $i ?>:30:00">
                        <?php } ?>
                        <?php for ($i = 10; $i <= 23; $i++) { ?>
                        <option  label = "<?php echo $i ?>:00:00">
                        <option  label = "<?php echo $i ?>:30:00">
                        <?php } ?>
                    </select>
                </div>
            </div>
            <div class="mess"></div>
            <div class="modal-footer margin-top-60">
                <button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button>
                <button type="submit" class="btn btn-primary save-hall">Сохранить изменения</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="addGuest" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-window">
        <div class="modal-content ">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">Добавление/редактирование участника</h4>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="inputFirstName" class="control-label col-xs-2 margin-top-10">Имя</label>
                    <div class="col-xs-10 ">
                        <input type="text" class="form-control" id="inputFirstName" placeholder="Имя">
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputSecondName" class="control-label col-xs-2 margin-top-10">Фамилия</label>
                    <div class="col-xs-10">
                        <input type="text" class="form-control" id="inputSecondName" placeholder="Фамилия">
                    </div>
                </div>
                <div class="form-group margin-top-10">
                    <label for="inputLastName" class="control-label col-xs-2 margin-top-10">Отчество</label>
                    <div class="col-xs-10">
                        <input type="text" class="form-control" id="inputLastName" placeholder="Отчество">
                    </div>
                </div>
            </div>
            <div class="mess"></div>
            <div class="modal-footer margin-top-60">
                <button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button>
                <button type="button" class="btn btn-primary">Сохранить изменения</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="addMeeting" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-window">
        <div class="modal-content ">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">Добавление/редактирование встречи</h4>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="inputMeetingName" class="control-label col-xs-2 margin-top-10">Название встречи</label>
                    <div class="col-xs-10 ">
                        <input type="text" class="form-control" id="inputMeetingName" placeholder="Название встречи">
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputMeetingStart" class="control-label col-xs-2 margin-top-10">Время начала</label>
                    <select  class="form-control" id="inputMeetingStart">
                        <option  label = "00:00:00">
                        <option  label = "00:30:00">
                            <?php for ($i = 1; $i <= 9; $i++) { ?>
                        <option  label = "0<?php echo $i ?>:00:00">
                        <option  label = "0<?php echo $i ?>:30:00">
                            <?php } ?>
                            <?php for ($i = 10; $i <= 23; $i++) { ?>
                        <option  label = "<?php echo $i ?>:00:00">
                        <option  label = "<?php echo $i ?>:30:00">
                            <?php } ?>
                    </select>
                </div>
                <div class="form-group">
                    <label for="inputMeetingEnd" class="control-label col-xs-2 margin-top-10">Время окончания</label>
                    <select  class="form-control col-xs-10" id="inputMeetingStart">
                        <option  label = "00:00:00">
                        <option  label = "00:30:00">
                            <?php for ($i = 1; $i <= 9; $i++) { ?>
                        <option  label = "0<?php echo $i ?>:00:00">
                        <option  label = "0<?php echo $i ?>:30:00">
                            <?php } ?>
                            <?php for ($i = 10; $i <= 23; $i++) { ?>
                        <option  label = "<?php echo $i ?>:00:00">
                        <option  label = "<?php echo $i ?>:30:00">
                            <?php } ?>
                    </select>
                </div>
                <div class="form-group">
                    <label class="margin-top-40" for="repeat">Повторение</label>
                    <select class="form-control" id="repeat">
                        <option>Одна встреча</option>
                        <option>Ежедневно</option>
                        <option>Еженедельно</option>
                        <option>Ежемесячно</option>
                    </select>
                    <p class="col-lg-2 col-sm-2 col-xs-2 margin-top-10">Повторять до:</p>
                    <div class="col-lg-1 col-sm-1 col-xs-1"></div>
                    <input  type="date" class="col-lg-2 col-sm-2 col-xs-2 form-control calendar-width date-repeat margin-top-10" id="date" name="date">
                </div>
            </div>
            <div class="mess"></div>
            <div class="modal-footer margin-top-40">
                <button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button>
                <button type="button" class="btn btn-primary">Сохранить изменения</button>
            </div>
        </div>
    </div>
</div>
<input class="hidden token" value="<?php echo $token; ?>">

