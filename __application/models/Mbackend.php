<?php if (!defined('BASEPATH')) {exit('No direct script access allowed');}

class Mbackend extends CI_Model{
	function __construct(){
		parent::__construct();
		//$this->auth = unserialize(base64_decode($this->session->userdata('n0k111a')));
	}
	
	function getdata($type="", $balikan="", $p1="", $p2="",$p3="",$p4=""){
		$where = " WHERE 1=1 ";
		if($this->input->post('kat')){
			if($this->input->post('kat') == 'all'){
				$table = $this->input->post('table');
				$field = $this->db->list_fields($table);
				$where .= " AND ( ";
				foreach($field as $k => $v){
					if($v == 'update_by' || $v == 'update_date'){
						continue;
					}
					if ($k == reset($field)){
						$where .= $v." like '%".$this->db->escape_str($this->input->post('key'))."%' ";
					}elseif ($k == end($field)){
						$where .= $v." like '%".$this->db->escape_str($this->input->post('key'))."%' ";
					}else{
						$where .= "OR ".$v." like '%".$this->db->escape_str($this->input->post('key'))."%' ";
					}
				}
				$where .= " ) ";
			}else{
				$where .=" AND ".$this->input->post('kat')." like '%".$this->db->escape_str($this->input->post('key'))."%'";
			}
		}
		
		switch($type){
			case "data_login":
				$sql = "
					SELECT *
					FROM tbl_user 
					WHERE nama_user = '".$p1."'
				";
			break;
			case "phase": 
				$sql = "
					SELECT *
					FROM tbl_master_phase
					$where 
				";
				
			break;
			case "potype": 
				$sql = "
					SELECT *
					FROM tbl_master_potype
					$where
				";
			break;
			case "pocurrency": 
				$sql = "
					SELECT *
					FROM tbl_master_pocurrency
					$where
				";
			break;
			case "region": 
				$sql = "
					SELECT *
					FROM tbl_master_region
					$where
				";
			break;
			case "sitename": 
				$sql = "
					SELECT *
					FROM tbl_master_sitename
					$where
				";
			break;
			case "pone": 
				$sql = "
					SELECT *
					FROM tbl_master_pone
					$where
				";
			break;
			case "masterpo": 
				$sql = "
					SELECT *
					FROM tbl_master_po
					$where
				";
			break;
		}
		
		if($balikan == 'json'){
			return $this->lib->json_grid($sql);
		}elseif($balikan == 'row_array'){
			return $this->db->query($sql)->row_array();
		}elseif($balikan == 'result'){
			return $this->db->query($sql)->result();
		}elseif($balikan == 'result_array'){
			return $this->db->query($sql)->result_array();
		}
		
	}
	
	function get_combo($type="", $p1="", $p2=""){
		switch($type){
			case "cl_kategori":
				$sql = "
					SELECT id, nama_kategori as txt
					FROM cl_kategori
				";
			break;
		}
		
		return $this->db->query($sql)->result_array();
	}
	
	function simpandata($table,$data,$sts_crud){ //$sts_crud --> STATUS NYEE INSERT, UPDATE, DELETE
		$this->db->trans_begin();
		if(isset($data['id'])){
			$id = $data['id'];
			unset($data['id']);
		}
		
		$data['update_by'] = $this->auth['nama_user']; 
		$data['update_date'] = date('Y-m-d H:i:s'); 
		
		switch($table){
			case "tbl_master_phase":
			
			break;
			case "tbl_master_potype":
				
			break;
			case "tbl_master_pocurrency":
				
			break;
			case "tbl_master_region":
				
			break;
			case "tbl_master_sitename":
				
			break;
			case "tbl_master_pone":
				
			break;
			case "tbl_master_po":
				
			break;
		}
		
		switch ($sts_crud){
			case "add": 
				$data['status'] = 1;
				$this->db->insert($table,$data);
			break;
			case "edit":
				$this->db->update($table, $data, array('id' => $id) );
			break;
			case "inactive":
				$data['status'] = 0;
				$this->db->update($table, $data, array('id' => $id) );
			break;
			case "activate":
				$data['status'] = 1;
				$this->db->update($table, $data, array('id' => $id) );
			break;
		}
		
		if($this->db->trans_status() == false){
			$this->db->trans_rollback();
			return 'gagal';
		}else{
			 return $this->db->trans_commit();
		}
	}
	
}
