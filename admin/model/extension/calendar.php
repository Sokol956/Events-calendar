<?php
class ModelExtensionCalendar extends Model
{

    public function getHalls()
    {
        $query = $this->db->query("SELECT * FROM `" . DB_PREFIX . "halls`");

        return $query->rows;
    }

    public function getMeetingsByDay($day)
    {
        $query = $this->db->query("SELECT * FROM `" . DB_PREFIX . "meetings` WHERE `meeting_date`='" . $day . "'");

        return $query->rows;
    }

    public function getMeetingById($meetingId)
    {
        $query = $this->db->query("SELECT * FROM `" . DB_PREFIX . "meetings` WHERE `meeting_id`='" . $meetingId . "'");

        return $query->rows;
    }

    public function getMeetingGuests($meetingId)
    {
        $query = $this->db->query("SELECT * FROM `" . DB_PREFIX . "guests` WHERE `meeting_id`='" . $meetingId . "'");

        return $query->rows;
    }

    public function getHallById($hallId)
    {
        $query = $this->db->query("SELECT * FROM `" . DB_PREFIX . "halls` WHERE `hall_id`='" . $hallId . "'");

        return $query->rows;
    }

    public function insertHall($hallName, $hallStartTime, $hallEndTime)
    {
        $this->db->query("INSERT INTO `" . DB_PREFIX . "halls` (`hall_name`, `hall_time_start`, `hall_time_end`) VALUES ('" . $hallName . "', '" . $hallStartTime . "', '" . $hallEndTime . "')");
    }

    public function editHall($hallName, $hallStartTime, $hallEndTime, $hallId)
    {
        $this->db->query("UPDATE `" . DB_PREFIX . "halls` SET `hall_name`='". $hallName ."',`hall_time_start`='". $hallStartTime ."',`hall_time_end`='". $hallEndTime ."' WHERE  `hall_id`='". $hallId ."'");
    }

    public function deleteHallById($id)
    {
        $this->db->query("DELETE FROM `". DB_PREFIX ."halls` WHERE hall_id='". $id ."';");
    }

    public function insertGuest($guestFirstName, $guestSecondName, $guestThirdName, $meetingId)
    {
        $this->db->query("INSERT INTO `" . DB_PREFIX . "guests` (`guest_first_name`, `guest_second_name`, `guest_third_name`, `meeting_id`) VALUES ('" . $guestFirstName . "', '" . $guestSecondName . "', '" . $guestThirdName . "', '" . $meetingId . "')");
    }

    public function getGuestById($guestId)
    {
        $query = $this->db->query("SELECT * FROM `" . DB_PREFIX . "guests` WHERE `guest_id`='" . $guestId . "'");

        return $query->rows;
    }

    public function editGuest($guestFirstName, $guestSecondName, $guestThirdName, $GuestId)
    {
        $this->db->query("UPDATE `" . DB_PREFIX . "guests` SET `guest_first_name`='". $guestFirstName ."',`guest_second_name`='". $guestSecondName ."',`guest_third_name`='". $guestThirdName ."' WHERE  `guest_id`='". $GuestId ."'");
    }


    public function deleteGuestById($id)
    {
        $this->db->query("DELETE FROM `". DB_PREFIX ."guests` WHERE guest_id='". $id ."';");
    }

}