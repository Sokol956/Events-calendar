<?php

class ControllerExtensionModuleCalendar extends Controller {
    private $error = array();
    public function index() {
        $this->load->language('extension/module/calendar');

        $this->document->setTitle($this->language->get('heading_title'));
        $this->document->addStyle('view/stylesheet/style.css');
        $this->document->addScript('view/javascript/calendar.js');

        $this->load->model('extension/calendar');


        if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validate()) {
            if (!isset($this->request->get['module_id'])) {
                $this->model_extension_module->addModule('featured', $this->request->post);
            } else {
                $this->model_extension_module->editModule($this->request->get['module_id'], $this->request->post);
            }

            $this->session->data['success'] = $this->language->get('text_success');

            $this->response->redirect($this->url->link('extension/extension', 'token=' . $this->session->data['token'] . '&type=module', true));
        }

        $data['heading_title'] = $this->language->get('heading_title');

        $data['text_calendar'] = $this->language->get('text_calendar');
        $data['text_success'] = $this->language->get('text_success');
        $data['text_edit'] = $this->language->get('text_edit');

        $data['entry_status'] = $this->language->get('entry_status');
        $data['error_permission'] = $this->language->get('error_permission');

        if (isset($this->error['warning'])) {
            $data['error_warning'] = $this->error['warning'];
        } else {
            $data['error_warning'] = '';
        }

        if (isset($this->error['name'])) {
            $data['error_name'] = $this->error['name'];
        } else {
            $data['error_name'] = '';
        }

        if (isset($this->error['width'])) {
            $data['error_width'] = $this->error['width'];
        } else {
            $data['error_width'] = '';
        }

        if (isset($this->error['height'])) {
            $data['error_height'] = $this->error['height'];
        } else {
            $data['error_height'] = '';
        }

        $data['breadcrumbs'] = array();

        $data['breadcrumbs'][] = array(
            'text' => $this->language->get('text_home'),
            'href' => $this->url->link('common/dashboard', 'token=' . $this->session->data['token'], true)
        );

        if (!isset($this->request->get['module_id'])) {
            $data['breadcrumbs'][] = array(
                'text' => $this->language->get('heading_title'),
                'href' => $this->url->link('extension/module/calendar', 'token=' . $this->session->data['token'], true)
            );
        } else {
            $data['breadcrumbs'][] = array(
                'text' => $this->language->get('heading_title'),
                'href' => $this->url->link('extension/module/calendar', 'token=' . $this->session->data['token'] . '&module_id=' . $this->request->get['module_id'], true)
            );
        }
        // Логика

        $today = date('Y-m-d');
        $data['today'] =  $today;

        $this->load->model('extension/calendar');





        $data['cancel'] = $this->url->link('extension/extension', 'token=' . $this->session->data['token'] . '&type=module', true);

        $data['token'] = $this->session->data['token'];

        $data['header'] = $this->load->controller('common/header');
        $data['column_left'] = $this->load->controller('common/column_left');
        $data['footer'] = $this->load->controller('common/footer');

        $this->response->setOutput($this->load->view('extension/module/calendar', $data));


    }

    public function main() {
        $this->load->model('extension/calendar');

        $halls = $this->model_extension_calendar->getHalls();
        $data['halls'] = $halls;
        $data['halls_count'] = count($halls);

        $this->response->setOutput($this->load->view( 'extension/module/calendar/calendar_main', $data));
    }

    public function meetingsInfo() {
        $this->load->model('extension/calendar');

        $day = $this->request->get['day'];
        $meetings = json_encode($this->model_extension_calendar->getMeetingsByDay($day));

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput($meetings);
    }

    public function meetingsGuests() {
        $this->load->model('extension/calendar');

        $meetingId = $this->request->get['meetingId'];
        $meeting = $this->model_extension_calendar->getMeetingById($meetingId);
        $data['meeting'] = $meeting;
        $guests = $this->model_extension_calendar->getMeetingGuests($meetingId);
        $data['guests'] = $guests;


        $this->response->setOutput($this->load->view( 'extension/module/calendar/calendar_meeting', $data));
    }

    public function saveHall() {
        $this->load->model('extension/calendar');

        $hallName = $this->request->get['inputHallName'];
        $hallStartTime = $this->request->get['inputStartTime'];
        $hallEndTime = $this->request->get['inputEndTime'];
        $this->model_extension_calendar->insertHall($hallName, $hallStartTime, $hallEndTime);
    }



    public function install() {
        $this->db->query("CREATE TABLE IF NOT EXISTS `". DB_PREFIX ."halls`(
            `hall_id` int(11) NOT NULL AUTO_INCREMENT,
            `hall_name` varchar(200) NOT NULL,
            `hall_time_start` time NOT NULL,
            `hall_time_end` time NOT NULL,
             PRIMARY KEY (`hall_id`)
        )ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;");

        $this->db->query("CREATE TABLE IF NOT EXISTS `". DB_PREFIX ."meetings`(
            `meeting_id` int(11) NOT NULL AUTO_INCREMENT,
            `meeting_date` date NOT NULL,
            `meeting_name` varchar(200) NOT NULL,
            `meeting_time_start` time NOT NULL,
            `meeting_time_end` time NOT NULL,
            `hall_id` int(11) NOT NULL,
            PRIMARY KEY (`meeting_id`)
        )ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;");

        $this->db->query("CREATE TABLE IF NOT EXISTS `". DB_PREFIX ."guests`(
            `guest_id` int(11) NOT NULL AUTO_INCREMENT,
            `guest_first_name` varchar(200) NOT NULL,
            `guest_second_name` varchar(200) NOT NULL,
            `guest_third_name` varchar(200) NOT NULL,
            `meeting_id` int(11) NOT NULL,
            PRIMARY KEY (`guest_id`)
        )ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;");
        
    }
}