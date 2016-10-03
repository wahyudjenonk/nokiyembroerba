<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Login extends JINGGA_Controller {
	
	function __construct(){
		parent::__construct();
		$this->load->library(array('encrypt','lib'));
	}
	
	public function index(){
		$user = $this->db->escape_str($this->input->post('user'));
		$pass = $this->db->escape_str($this->input->post('pwd'));
		$error=false;
		//echo $user;exit;
		//echo $this->encrypt->encode($pass);exit;
		if($user && $pass){
			$cek_user = $this->mbackend->getdata('data_login', 'row_array', $user);
			//print_r($cek_user);exit;
			if(count($cek_user)>0){
				if(isset($cek_user['status']) && $cek_user['status']==1){
					if($pass == $this->encrypt->decode($cek_user['password'])){
						$this->session->set_userdata('n0k111a', base64_encode(serialize($cek_user)));
					}else{
						$error=true;
						$this->session->set_flashdata('error', 'Incorrect Password');
					}
				}else{
					$error=true;
					$this->session->set_flashdata('error', 'User Not Activate');
				}
			}else{
				$error=true;
				$this->session->set_flashdata('error', 'User Not Registered');
			}
		}else{
			$error=true;
			$this->session->set_flashdata('error', 'Fill Username & Password');
		}
		header("Location: " . $this->host ."backoffice");
	
		
	}
	
	function logout(){
		$log = $this->db->update('tbl_user', array('last_log_date'=>date('Y-m-d')), array('nama_user'=>$this->auth['nama_user']) );
		if($log){
			$this->session->unset_userdata('n0k111a', 'limit');
			$this->session->sess_destroy();
			header("Location: " . $this->host ."backoffice");
		}
	}
	
}
