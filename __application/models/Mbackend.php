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
					SELECT A.*, B.phase_code, B.phase_name, B.phase_year,
						D.currency, C.po_type
					FROM tbl_master_po A
					LEFT JOIN tbl_master_phase B ON B.id = A.tbl_master_phase_id
					LEFT JOIN tbl_master_potype C ON C.id = A.tbl_master_potype_id
					LEFT JOIN tbl_master_pocurrency D ON D.id = A.tbl_master_currency_id
					$where
				";
			break;
			case "mastercr": 
				$sql = "
					SELECT A.*, B.phase_code, B.phase_name, B.phase_year
					FROM tbl_master_cr A
					LEFT JOIN tbl_master_phase B ON B.id = A.tbl_master_phase_id
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
			case "tbl_master_cr":
				
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
	
	function importdata($type=""){
		$this->load->library("PHPExcel");
		if(!empty($_FILES['file_import']['name'])){
			$ext = explode('.',$_FILES['file_import']['name']);
			$exttemp = sizeof($ext) - 1;
			$extension = $ext[$exttemp];
			
			$upload_path = "./__repository/tmp_upload/";
			$filename =  $this->lib->uploadnong($upload_path, 'file_import', $type);
			
			$folder_aplod = $upload_path.$filename;
			$cacheMethod   = PHPExcel_CachedObjectStorageFactory::cache_to_phpTemp;
			$cacheSettings = array('memoryCacheSize' => '1600MB');
			PHPExcel_Settings::setCacheStorageMethod($cacheMethod,$cacheSettings);
			if($extension=='xls'){
				$lib="Excel5";
			}else{
				$lib="Excel2007";
			}
			
			$objReader =  PHPExcel_IOFactory::createReader($lib);//excel2007
			ini_set('max_execution_time', 123456);
			//end set
			
			$objPHPExcel = $objReader->load($folder_aplod); 
			$objReader->setReadDataOnly(true);
			$nama_sheet=$objPHPExcel->getSheetNames();
			$worksheet = $objPHPExcel->setActiveSheetIndex(0);
			$array_benar = array();
			$array_salah = array();
						
			switch($type){
				case "masterpo":
					for($i=6; $i <= $worksheet->getHighestRow(); $i++){
						$statusdata = true;
						$arrayphasesalah = array();
						$arraypotypesalah = array();
						$arraycurrencysalah = array();

						if($worksheet->getCell("B".$i)->getCalculatedValue() != "" || $worksheet->getCell("C".$i)->getCalculatedValue() != "" || $worksheet->getCell("D".$i)->getCalculatedValue() != ""){
							$arrayphase = array(
								'phase_code' => $worksheet->getCell("B".$i)->getCalculatedValue(),
								'phase_name' => $worksheet->getCell("D".$i)->getCalculatedValue(),
								'phase_year' => $worksheet->getCell("C".$i)->getCalculatedValue(),
							);
							$cekphase = $this->db->get_where('tbl_master_phase', $arrayphase)->row_array();
							if(isset($cekphase)){
								$tbl_master_phase_id = $cekphase['id'];
							}else{
								$statusdata = false;
								$arrayphasesalah['phase_code'] = $worksheet->getCell("B".$i)->getCalculatedValue();
								$arrayphasesalah['phase_name'] = $worksheet->getCell("D".$i)->getCalculatedValue();
								$arrayphasesalah['phase_year'] = $worksheet->getCell("C".$i)->getCalculatedValue();
							}
						}
						if($worksheet->getCell("E".$i)->getCalculatedValue() != ""){
							$arraypotype = array(
								'po_type' => $worksheet->getCell("E".$i)->getCalculatedValue(),
							);
							$cekpotype = $this->db->get_where('tbl_master_potype', $arraypotype)->row_array();
							if(isset($cekpotype)){
								$tbl_master_potype_id = $cekpotype['id'];
							}else{
								$statusdata = false;
								$arraypotypesalah['po_type'] = $worksheet->getCell("E".$i)->getCalculatedValue();
							}
						}
						if($worksheet->getCell("H".$i)->getCalculatedValue() != ""){
							$arraycurrency = array(
								'currency' => $worksheet->getCell("H".$i)->getCalculatedValue(),
							);
							$cekcurrency = $this->db->get_where('tbl_master_pocurrency', $arraycurrency)->row_array();
							if(isset($cekcurrency)){
								$tbl_master_currency_id = $cekcurrency['id'];
							}else{
								$statusdata = false;
								$arraycurrencysalah['currency'] = $worksheet->getCell("H".$i)->getCalculatedValue();
							}
						}
						
						if($statusdata == true){
							$podate = date_format(date_create_from_format(' d/m/Y', $worksheet->getCell("J".$i)->getCalculatedValue()), 'Y-m-d');
							$poreceived = date_format(date_create_from_format(' d/m/Y', $worksheet->getCell("K".$i)->getCalculatedValue()), 'Y-m-d');
							$podelivery = date_format(date_create_from_format(' d/m/Y', $worksheet->getCell("L".$i)->getCalculatedValue()), 'Y-m-d');
							$arrayinsertbenar = array(
								'tbl_master_phase_id' => $tbl_master_phase_id,
								'tbl_master_potype_id' => $tbl_master_potype_id,
								'tbl_master_currency_id' => $tbl_master_currency_id,
								'po_no' => $worksheet->getCell("F".$i)->getCalculatedValue(),
								'project_name' => $worksheet->getCell("G".$i)->getCalculatedValue(),
								'basic_contract' => $worksheet->getCell("I".$i)->getCalculatedValue(),
								'po_date' => $podate,
								'po_received' => $poreceived,
								'po_delivery' => $podelivery,
								'revision_no' => $worksheet->getCell("M".$i)->getCalculatedValue(),
								
								'po_gross_idr' => $worksheet->getCell("N".$i)->getCalculatedValue(),
								'po_nett_idr' => $worksheet->getCell("O".$i)->getCalculatedValue(),
								'jis_dorr_rate' => $worksheet->getCell("P".$i)->getCalculatedValue(),
								'po_gross_usd' => $worksheet->getCell("Q".$i)->getCalculatedValue(),
								'po_nett_usd' => $worksheet->getCell("R".$i)->getCalculatedValue(),
								'remarks' => $worksheet->getCell("S".$i)->getCalculatedValue(),
							);
							array_push($array_benar, $arrayinsertbenar);
						}else{
							$arrayinsertsalah = array(
								'row' => $i,
								'phase' => $arrayphasesalah,
								'potype' => $arraypotypesalah,
								'currency' => $arraycurrencysalah
							);
							array_push($array_salah, $arrayinsertsalah);
						}
					}
					$table = "tbl_master_po";
					
				break;
				case "mastercr":
					for($i=6; $i <= $worksheet->getHighestRow(); $i++){
						$statusdata = true;
						$arrayphasesalah = array();

						if($worksheet->getCell("E".$i)->getCalculatedValue() != "" || $worksheet->getCell("F".$i)->getCalculatedValue() != "" || $worksheet->getCell("G".$i)->getCalculatedValue() != ""){
							$arrayphase = array(
								'phase_code' => $worksheet->getCell("E".$i)->getCalculatedValue(),
								'phase_name' => $worksheet->getCell("F".$i)->getCalculatedValue(),
								'phase_year' => $worksheet->getCell("G".$i)->getCalculatedValue(),
							);
							$cekphase = $this->db->get_where('tbl_master_phase', $arrayphase)->row_array();
							if(isset($cekphase)){
								$tbl_master_phase_id = $cekphase['id'];
							}else{
								$statusdata = false;
								$arrayphasesalah['phase_code'] = $worksheet->getCell("E".$i)->getCalculatedValue();
								$arrayphasesalah['phase_name'] = $worksheet->getCell("F".$i)->getCalculatedValue();
								$arrayphasesalah['phase_year'] = $worksheet->getCell("G".$i)->getCalculatedValue();
							}
						}
						
						if($statusdata == true){
							$crsubmit = date_format(date_create_from_format(' d/m/Y', $worksheet->getCell("K".$i)->getCalculatedValue()), 'Y-m-d');
							$crapproved = date_format(date_create_from_format(' d/m/Y', $worksheet->getCell("L".$i)->getCalculatedValue()), 'Y-m-d');
							$poreceived = date_format(date_create_from_format(' d/m/Y', $worksheet->getCell("M".$i)->getCalculatedValue()), 'Y-m-d');
							$arrayinsertbenar = array(
								'tbl_master_phase_id' => $tbl_master_phase_id,
								'cr_no_nokia' => $worksheet->getCell("B".$i)->getCalculatedValue(),
								'cr_no_indosat' => $worksheet->getCell("C".$i)->getCalculatedValue(),
								'cr_status' => $worksheet->getCell("D".$i)->getCalculatedValue(),
								'nodin' => $worksheet->getCell("H".$i)->getCalculatedValue(),
								'cr_position' => $worksheet->getCell("I".$i)->getCalculatedValue(),
								'cr_pic' => $worksheet->getCell("J".$i)->getCalculatedValue(),
								'cr_submit' => $crsubmit,
								'cr_approved' => $crapproved,
								'po_received' => $poreceived,
								'value_before' => $worksheet->getCell("N".$i)->getCalculatedValue(),	
								'value_after' => $worksheet->getCell("O".$i)->getCalculatedValue(),
								'value_delta' => $worksheet->getCell("P".$i)->getCalculatedValue(),
								'cr_type' => $worksheet->getCell("Q".$i)->getCalculatedValue(),
								'remarks' => $worksheet->getCell("R".$i)->getCalculatedValue(),
							);
							array_push($array_benar, $arrayinsertbenar);
						}else{
							$arrayinsertsalah = array(
								'row' => $i,
								'phase' => $arrayphasesalah
							);
							array_push($array_salah, $arrayinsertsalah);
						}
					}
					$table = "tbl_master_cr";
					
				break;
			}
			
			if(!empty($array_salah)){
				return $array_salah;
			}else{
				if($array_benar){
					$this->db->insert_batch($table, $array_benar);
					return 1;
				}
			}
		}
	}
	
}
