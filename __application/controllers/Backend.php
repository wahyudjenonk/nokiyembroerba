<?php if (!defined('BASEPATH')) {exit('No direct script access allowed');}

class Backend extends JINGGA_Controller {
	
	function __construct(){
		parent::__construct();
		if(!$this->auth){
			$this->nsmarty->display('backend/main-login.html');
			exit;
		}
		$this->nsmarty->assign('acak', md5(date('H:i:s')) );
		$this->temp="backend/";
		$this->load->model('mbackend');
		$this->load->library(array('encrypt','lib'));
	}
	
	function index(){
		if($this->auth){
			$menu = $this->mbackend->getdata('menu', 'variable');
			$this->nsmarty->assign('menu', $menu);
			$this->nsmarty->display( 'backend/main-backend.html');
		}else{
			$this->nsmarty->display( 'backend/main-login.html');
		}
	}
		
	function getdisplay($p1="", $p2=""){
		$display = false;
		$temp = "backend/modul/".$p1."/".$p2.".html";
		$editstatus = $this->input->post('editstatus');
		$id = $this->input->post('id');
		
		switch($p1){
			case "beranda":
				$display = true;
			break;
			case "master":
				$display = true;
				
				switch($p2){
					case "form-phase":
						if($editstatus == 'edit'){
							$data = $this->db->get_where('tbl_master_phase', array('id'=>$id))->row_array();
							$this->nsmarty->assign("data", $data);
						}						
					break;
					case "form-potype":
						if($editstatus == 'edit'){
							$data = $this->db->get_where('tbl_master_potype', array('id'=>$id))->row_array();
							$this->nsmarty->assign("data", $data);
						}
					break;
					case "form-pocurrency":
						if($editstatus == 'edit'){
							$data = $this->db->get_where('tbl_master_pocurrency', array('id'=>$id))->row_array();
							$this->nsmarty->assign("data", $data);
						}
					break;
					case "form-region":
						if($editstatus == 'edit'){
							$data = $this->db->get_where('tbl_master_region', array('id'=>$id))->row_array();
							$this->nsmarty->assign("data", $data);
						}
					break;
					case "form-sitename":
						if($editstatus == 'edit'){
							$data = $this->db->get_where('tbl_master_sitename', array('id'=>$id))->row_array();
							$this->nsmarty->assign("data", $data);
						}
					break;
					case "form-pone":
						if($editstatus == 'edit'){
							$data = $this->db->get_where('tbl_master_pone', array('id'=>$id))->row_array();
							$this->nsmarty->assign("data", $data);
						}
					break;					
				}
			break;
			
			case "progress":
				$display = true;
				
				switch($p2){
					case "import-masterpo":
						$temp = "backend/modul/".$p1."/form-import.html";
						$type_import = $this->input->post('type_import');
						
						$this->nsmarty->assign("type_import", $type_import);
					break;
					case "form-masterpo":
						if($editstatus == 'edit'){
							$data = $this->db->get_where('tbl_master_po', array('id'=>$id))->row_array();
							$this->nsmarty->assign("data", $data);
						}
						$this->nsmarty->assign("tbl_master_phase_id", $this->lib->fillcombo('tbl_master_phase', 'return', ($editstatus == 'edit' ? $data['tbl_master_phase_id'] : "") ) );
						$this->nsmarty->assign("tbl_master_potype_id", $this->lib->fillcombo('tbl_master_potype', 'return', ($editstatus == 'edit' ? $data['tbl_master_potype_id'] : "") ) );
						$this->nsmarty->assign("tbl_master_currency_id", $this->lib->fillcombo('tbl_master_pocurrency', 'return', ($editstatus == 'edit' ? $data['tbl_master_currency_id'] : "") ) );
					break;
					
					case "import-mastercr":
						$temp = "backend/modul/".$p1."/form-import.html";
						$type_import = $this->input->post('type_import');
						
						$this->nsmarty->assign("type_import", $type_import);
					break;
					case "form-mastercr":
						if($editstatus == 'edit'){
							$data = $this->db->get_where('tbl_master_cr', array('id'=>$id))->row_array();
							$this->nsmarty->assign("data", $data);
						}
						$this->nsmarty->assign("tbl_master_phase_id", $this->lib->fillcombo('tbl_master_phase', 'return', ($editstatus == 'edit' ? $data['tbl_master_phase_id'] : "") ) );						
					break;
					case "import-uploadtracker":
						$temp = "backend/modul/".$p1."/form-import.html";
						$type_import = $this->input->post('type_import');
						
						$this->nsmarty->assign("type_import", $type_import);
						$this->nsmarty->assign("combotracker", $this->lib->fillcombo('combotracker', 'return') );
					break;
					case "form-siteinfo":
						if($editstatus == 'edit'){
							$data = $this->db->get_where('tbl_master_tracker_siteinfo', array('id'=>$id))->row_array();
							$this->nsmarty->assign("data", $data);
						}
						$this->nsmarty->assign("tbl_master_phase_id", $this->lib->fillcombo('tbl_master_phase', 'return', ($editstatus == 'edit' ? $data['tbl_master_phase_id'] : "") ) );
						$this->nsmarty->assign("tbl_master_sitename_id", $this->lib->fillcombo('tbl_master_sitename', 'return', ($editstatus == 'edit' ? $data['tbl_master_sitename_id'] : "") ) );
						$this->nsmarty->assign("tbl_master_region_id", $this->lib->fillcombo('tbl_master_region', 'return', ($editstatus == 'edit' ? $data['tbl_master_region_id'] : "") ) );
						$this->nsmarty->assign("tbl_master_pone_id", $this->lib->fillcombo('tbl_master_pone', 'return', ($editstatus == 'edit' ? $data['tbl_master_pone_id'] : "") ) );
					break;
				}
			break;
			case "database":
				$display = true;
				
				switch($p2){
					case "import-uploadalldatabase":
						$temp = "backend/modul/".$p1."/form-import.html";
						$type_import = $this->input->post('type_import');
						
						$this->nsmarty->assign("type_import", $type_import);
						$this->nsmarty->assign("combotracker", $this->lib->fillcombo('combotracker', 'return') );
					break;
					case "form-receivedall":
						if($editstatus == 'edit'){
							$data = $this->db->get_where('tbl_all_database', array('id'=>$id))->row_array();
							$this->nsmarty->assign("data", $data);
						}						
					break;	
					case "form-receiveddollar":
						if($editstatus == 'edit'){
							$data = $this->db->get_where('tbl_all_database', array('id'=>$id))->row_array();
							$this->nsmarty->assign("data", $data);
						}						
					break;
					case "form-received":
						if($editstatus == 'edit'){
							$data = $this->db->get_where('tbl_all_database', array('id'=>$id))->row_array();
							$this->nsmarty->assign("data", $data);
						}						
					break;	
					case "form-reservationall":
						if($editstatus == 'edit'){
							$data = $this->db->get_where('tbl_all_database', array('id'=>$id))->row_array();
							$this->nsmarty->assign("data", $data);
						}						
					break;	
					case "form-reservationdollar":
						if($editstatus == 'edit'){
							$data = $this->db->get_where('tbl_all_database', array('id'=>$id))->row_array();
							$this->nsmarty->assign("data", $data);
						}						
					break;
					case "form-reservation":
						if($editstatus == 'edit'){
							$data = $this->db->get_where('tbl_all_database', array('id'=>$id))->row_array();
							$this->nsmarty->assign("data", $data);
						}						
					break;	
					case "form-boqpersite":
						if($editstatus == 'edit'){
							$data = $this->db->get_where('tbl_all_database', array('id'=>$id))->row_array();
							$this->nsmarty->assign("data", $data);
						}						
					break;	
					case "form-boqall":
						if($editstatus == 'edit'){
							$data = $this->db->get_where('tbl_all_database', array('id'=>$id))->row_array();
							$this->nsmarty->assign("data", $data);
						}						
					break;	
					case "form-boqoa":
						if($editstatus == 'edit'){
							$data = $this->db->get_where('tbl_all_database', array('id'=>$id))->row_array();
							$this->nsmarty->assign("data", $data);
						}						
					break;			
					case "form-boqba":
						if($editstatus == 'edit'){
							$data = $this->db->get_where('tbl_all_database', array('id'=>$id))->row_array();
							$this->nsmarty->assign("data", $data);
						}						
					break;
					case "form-boqinv":
						if($editstatus == 'edit'){
							$data = $this->db->get_where('tbl_all_database', array('id'=>$id))->row_array();
							$this->nsmarty->assign("data", $data);
						}						
					break;
					case "form-wpidso":
						if($editstatus == 'edit'){
							$data = $this->db->get_where('tbl_all_database', array('id'=>$id))->row_array();
							$this->nsmarty->assign("data", $data);
						}						
					break;
				}
			break;
			
			case "usermanagement":
				$display = true;
				
				switch($p2){
					case "check_username":
						$display = false;
						$username = $this->input->post('username');
						$data = $this->mbackend->getdata('cekusername', 'row_array', $username);
						if($data){
							echo 0;
						}else{
							echo 1;
						}
					break;					
					case "form-userlist":
						if($editstatus == 'edit'){
							$data = $this->db->get_where('tbl_user', array('id'=>$id))->row_array();
							$data['password'] = $this->encrypt->decode($data['password']);
							$this->nsmarty->assign("data", $data);
						}	
						$this->nsmarty->assign("user_group", $this->lib->fillcombo('tbl_user_group', 'return', ($editstatus == 'edit' ? $data['cl_user_group_id'] : "") ) );
					break;
					case "form-grouplist":
						if($editstatus == 'edit'){
							$data = $this->db->get_where('tbl_user_group', array('id'=>$id))->row_array();
							$this->nsmarty->assign("data", $data);
						}	
					break;
					case "form_user_role":
						$id_role = $this->input->post('id');
						$array = array();
						$dataParent = $this->mbackend->getdata('menu_parent', 'result_array');
						foreach($dataParent as $k=>$v){
							$dataChild = $this->mbackend->getdata('menu_child', 'result_array', $v['id']);
							$dataPrev = $this->mbackend->getdata('previliges_menu', 'row_array', $v['id'], $id_role);
							
							$array[$k]['id'] = $v['id'];
							$array[$k]['nama_menu'] = $v['nama_menu'];
							$array[$k]['id_prev'] = (isset($dataPrev['id']) ? $dataPrev['id'] : 0) ;
							$array[$k]['buat'] = (isset($dataPrev['buat']) ? $dataPrev['buat'] : 0) ;
							$array[$k]['baca'] = (isset($dataPrev['baca']) ? $dataPrev['baca'] : 0);
							$array[$k]['ubah'] = (isset($dataPrev['ubah']) ? $dataPrev['ubah'] : 0);
							$array[$k]['hapus'] = (isset($dataPrev['hapus']) ? $dataPrev['hapus'] : 0);
							$array[$k]['child_menu'] = array();
							$jml = 0;
							foreach($dataChild as $y => $t){
								$dataPrevChild = $this->mbackend->getdata('previliges_menu', 'row_array', $t['id'], $id_role);
								$array[$k]['child_menu'][$y]['id_child'] = $t['id'];
								$array[$k]['child_menu'][$y]['nama_menu_child'] = $t['nama_menu'];
								$array[$k]['child_menu'][$y]['type_menu'] = $t['type_menu'];
								$array[$k]['child_menu'][$y]['id_prev'] = (isset($dataPrevChild['id']) ? $dataPrevChild['id'] : 0) ;
								$array[$k]['child_menu'][$y]['buat'] = (isset($dataPrevChild['buat']) ? $dataPrevChild['buat'] : 0) ;
								$array[$k]['child_menu'][$y]['baca'] = (isset($dataPrevChild['baca']) ? $dataPrevChild['baca'] : 0) ;
								$array[$k]['child_menu'][$y]['ubah'] = (isset($dataPrevChild['ubah']) ? $dataPrevChild['ubah'] : 0) ;
								$array[$k]['child_menu'][$y]['hapus'] = (isset($dataPrevChild['hapus']) ? $dataPrevChild['hapus'] : 0) ;
								$jml++;
								
								if($t['type_menu'] == 'CHC'){
									$array[$k]['child_menu'][$y]['sub_child_menu'] = array();
									$dataSubChild = $this->mbackend->getdata('menu_child_2', 'result_array', $t['id']);
									$jml_sub_child = 0;
									foreach($dataSubChild as $x => $z){
										$dataPrevSubChild = $this->mbackend->getdata('previliges_menu', 'row_array', $z['id'], $id_role);
										$array[$k]['child_menu'][$y]['sub_child_menu'][$x]['id_sub_child'] = $z['id'];
										$array[$k]['child_menu'][$y]['sub_child_menu'][$x]['nama_menu_sub_child'] = $z['nama_menu'];
										$array[$k]['child_menu'][$y]['sub_child_menu'][$x]['id_prev'] = (isset($dataPrevSubChild['id']) ? $dataPrevSubChild['id'] : 0) ;
										$array[$k]['child_menu'][$y]['sub_child_menu'][$x]['buat'] = (isset($dataPrevSubChild['buat']) ? $dataPrevSubChild['buat'] : 0) ;
										$array[$k]['child_menu'][$y]['sub_child_menu'][$x]['baca'] = (isset($dataPrevSubChild['baca']) ? $dataPrevSubChild['baca'] : 0) ;
										$array[$k]['child_menu'][$y]['sub_child_menu'][$x]['ubah'] = (isset($dataPrevSubChild['ubah']) ? $dataPrevSubChild['ubah'] : 0) ;
										$array[$k]['child_menu'][$y]['sub_child_menu'][$x]['hapus'] = (isset($dataPrevSubChild['hapus']) ? $dataPrevSubChild['hapus'] : 0) ;
										$jml_sub_child++;
									}
								}
							}
							$array[$k]['total_child'] = $jml;
						}
						
						/*
						echo "<pre>";
						print_r($array);
						exit;
						//*/
						
						$this->nsmarty->assign('role', $array);
						$this->nsmarty->assign('id_group', $id_role);
					break;
				
				}
			break;
		}
		
		$this->nsmarty->assign("main", $p1);
		$this->nsmarty->assign("submodul", $p2);
		$this->nsmarty->assign("editstatus", $editstatus);
		$this->nsmarty->assign("acak", md5(date('H:i:s')) );
		
		if($display == true){
			if(!file_exists($this->config->item('appl').APPPATH.'views/'.$temp)){$this->nsmarty->display('konstruksi.html');}
			$this->nsmarty->display($temp);
		}
	}
	
	function getdata($p1,$p2="",$p3=""){
		echo $this->mbackend->getdata($p1,'json',$p3);
	}
	
	function exportdata($type, $mod, $submodul){
		switch($type){
			case "excell":
				$data = $this->mbackend->getdata($submodul, 'result_array');
				
				if($data){
					$date=date('YmdHis');
					
					header("Content-type: application/vnd-ms-excel");
					header("Content-Disposition: attachment; filename=expordata-".$submodul."-".$date.".xls");
					
					$this->nsmarty->assign('submodul', $submodul);
					$this->nsmarty->assign('data', $data);
					$html = $this->nsmarty->fetch('backend/modul/'.$mod.'/exportexcell.html');
					
					echo $html;
				}else{
					echo "No Data in Table";
				}
			break;
		}
	}
	
	function exportdatawithtemplate($p1=""){
		$this->load->library("PHPExcel");
		$objReader = PHPExcel_IOFactory::createReader('Excel2007');
		$data = $this->mbackend->getdata($p1,'result_array');
		$date=date('Ymd-His');

		switch($p1){
			case "masterpo":
				$filename = "export-data-masterpo-".$date;
				$objPHPExcel = $objReader->load("__repository/template_export/template-export-masterpo.xlsx");
				$worksheet = $objPHPExcel->setActiveSheetIndex(0);
				$rowCount = 5;
				
				foreach($data as $k => $v){
					$rowCount++;
					$objPHPExcel->getActiveSheet()->getStyle('J'.$rowCount)->getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_DATE_YYYYMMDD2);					
					$objPHPExcel->getActiveSheet()->getStyle('K'.$rowCount)->getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_DATE_YYYYMMDD2);					
					$objPHPExcel->getActiveSheet()->getStyle('L'.$rowCount)->getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_DATE_YYYYMMDD2);					
					$worksheet->SetCellValue('A'.$rowCount, $v['id']);
					$worksheet->SetCellValue('B'.$rowCount, $v['phase_code']);
					$worksheet->SetCellValue('C'.$rowCount, $v['phase_year']);
					$worksheet->SetCellValue('D'.$rowCount, $v['phase_name']);
					$worksheet->SetCellValue('E'.$rowCount, $v['po_type']);
					$worksheet->SetCellValue('F'.$rowCount, $v['po_no']);
					$worksheet->SetCellValue('G'.$rowCount, $v['project_name']);
					$worksheet->SetCellValue('H'.$rowCount, $v['currency']);
					$worksheet->SetCellValue('I'.$rowCount, $v['basic_contract']);
					$worksheet->SetCellValue('J'.$rowCount, $v['po_date']);
					$worksheet->SetCellValue('K'.$rowCount, $v['po_received']);
					$worksheet->SetCellValue('L'.$rowCount, $v['po_delivery']);
					$worksheet->SetCellValue('M'.$rowCount, $v['revision_no']);
					$worksheet->SetCellValue('N'.$rowCount, $v['po_gross_idr']);
					$worksheet->SetCellValue('O'.$rowCount, $v['po_nett_idr']);
					$worksheet->SetCellValue('P'.$rowCount, $v['jis_dorr_rate']);
					$worksheet->SetCellValue('Q'.$rowCount, $v['po_gross_usd']);
					$worksheet->SetCellValue('R'.$rowCount, $v['po_nett_usd']);
					$worksheet->SetCellValue('S'.$rowCount, $v['remarks']);
					$worksheet->SetCellValue('T'.$rowCount, $v['update_by']);
					$worksheet->SetCellValue('U'.$rowCount, $v['update_date']);
					$worksheet->SetCellValue('V'.$rowCount, $v['file_name']);
					$worksheet->SetCellValue('W'.$rowCount, $v['status']);
				}
			break;
			case "mastercr":
				$filename = "export-data-mastercr-".$date;
				$objPHPExcel = $objReader->load("__repository/template_export/template-export-mastercr.xlsx");
				$worksheet = $objPHPExcel->setActiveSheetIndex(0);
				$rowCount = 5;
				
				foreach($data as $k => $v){
					$rowCount++;
					$worksheet->SetCellValue('A'.$rowCount, $v['id']);
					$worksheet->SetCellValue('B'.$rowCount, $v['cr_no_nokia']);
					$worksheet->SetCellValue('C'.$rowCount, $v['cr_no_indosat']);
					$worksheet->SetCellValue('D'.$rowCount, $v['cr_status']);
					$worksheet->SetCellValue('E'.$rowCount, $v['phase_code']);
					$worksheet->SetCellValue('F'.$rowCount, $v['phase_name']);
					$worksheet->SetCellValue('G'.$rowCount, $v['phase_year']);
					$worksheet->SetCellValue('H'.$rowCount, $v['nodin']);
					$worksheet->SetCellValue('I'.$rowCount, $v['cr_position']);
					$worksheet->SetCellValue('J'.$rowCount, $v['cr_pic']);
					$worksheet->SetCellValue('K'.$rowCount, $v['cr_submit']);
					$worksheet->SetCellValue('L'.$rowCount, $v['cr_approved']);
					$worksheet->SetCellValue('M'.$rowCount, $v['po_received']);
					$worksheet->SetCellValue('N'.$rowCount, $v['cr_currency']);
					$worksheet->SetCellValue('O'.$rowCount, $v['value_before']);
					$worksheet->SetCellValue('P'.$rowCount, $v['value_after']);
					$worksheet->SetCellValue('Q'.$rowCount, $v['value_delta']);
					$worksheet->SetCellValue('R'.$rowCount, $v['cr_type']);
					$worksheet->SetCellValue('S'.$rowCount, $v['value_additional']);
					$worksheet->SetCellValue('T'.$rowCount, $v['value_reduction']);
					$worksheet->SetCellValue('U'.$rowCount, $v['remarks']);
					$worksheet->SetCellValue('V'.$rowCount, $v['update_by']);
					$worksheet->SetCellValue('W'.$rowCount, $v['update_date']);
					$worksheet->SetCellValue('X'.$rowCount, $v['file_name']);
					$worksheet->SetCellValue('Y'.$rowCount, $v['status']);
				}
			break;
			case "siteinfo":
				$filename = "export-data-siteinfo-".$date;
				$objPHPExcel = $objReader->load("__repository/template_export/template-export-siteinfo.xlsx");
				$worksheet = $objPHPExcel->setActiveSheetIndex(0);
				$rowCount = 5;

				foreach($data as $k => $v){
					$rowCount++;
					$worksheet->SetCellValue('A'.$rowCount, $v['id']);
					$worksheet->SetCellValue('B'.$rowCount, $v['boqno']);
					$worksheet->SetCellValue('C'.$rowCount, $v['site_id']);
					$worksheet->SetCellValue('D'.$rowCount, $v['site_name']);
					$worksheet->SetCellValue('E'.$rowCount, $v['sow_category']);
					$worksheet->SetCellValue('F'.$rowCount, $v['site_status']);
					$worksheet->SetCellValue('G'.$rowCount, $v['region_code']);
					$worksheet->SetCellValue('H'.$rowCount, $v['area_name']);
					$worksheet->SetCellValue('I'.$rowCount, $v['cluster']);
					$worksheet->SetCellValue('J'.$rowCount, $v['phase_code']);
					$worksheet->SetCellValue('K'.$rowCount, $v['phase_name']);
					$worksheet->SetCellValue('L'.$rowCount, $v['sow_detail']);
					$worksheet->SetCellValue('M'.$rowCount, $v['system_key']);
					$worksheet->SetCellValue('N'.$rowCount, $v['site_id_ori']);
					$worksheet->SetCellValue('O'.$rowCount, $v['site_name_ori']);
					$worksheet->SetCellValue('P'.$rowCount, $v['po_ne']);
					$worksheet->SetCellValue('Q'.$rowCount, $v['network_boq']);
					$worksheet->SetCellValue('R'.$rowCount, $v['wp_id_svc']);
					$worksheet->SetCellValue('S'.$rowCount, $v['so_svc']);
					$worksheet->SetCellValue('T'.$rowCount, $v['partner_ni']);
					$worksheet->SetCellValue('U'.$rowCount, $v['partner_npo']);
					$worksheet->SetCellValue('V'.$rowCount, $v['remarks_siteinfo']);
					$worksheet->SetCellValue('W'.$rowCount, $v['update_by']);
					$worksheet->SetCellValue('X'.$rowCount, $v['update_date']);
					$worksheet->SetCellValue('Y'.$rowCount, $v['uploader_id']);
					$worksheet->SetCellValue('Z'.$rowCount, $v['status']);
				}
			break;
			case "siteprogress":
				$filename = "export-data-siteprogress-".$date;
				$objPHPExcel = $objReader->load("__repository/template_export/template-export-siteprogress.xlsx");
				$worksheet = $objPHPExcel->setActiveSheetIndex(0);
				$rowCount = 5;
				
				foreach($data as $k => $v){
					$rowCount++;
					$worksheet->SetCellValue('A'.$rowCount, $v['id']);
					$worksheet->SetCellValue('B'.$rowCount, $v['boqno']);
					$worksheet->SetCellValue('C'.$rowCount, $v['site_id']);
					$worksheet->SetCellValue('D'.$rowCount, $v['site_name']);
					$worksheet->SetCellValue('E'.$rowCount, $v['sow_category']);
					$worksheet->SetCellValue('F'.$rowCount, $v['site_status']);
					$worksheet->SetCellValue('G'.$rowCount, $v['region_code']);
					$worksheet->SetCellValue('H'.$rowCount, $v['phase_name']);
					$worksheet->SetCellValue('I'.$rowCount, $v['po_ne']);
					$worksheet->SetCellValue('J'.$rowCount, $v['rfi']);
					$worksheet->SetCellValue('K'.$rowCount, $v['tss']);
					$worksheet->SetCellValue('L'.$rowCount, $v['mos']);
					$worksheet->SetCellValue('M'.$rowCount, $v['installed']);
					$worksheet->SetCellValue('N'.$rowCount, $v['g900']);
					$worksheet->SetCellValue('O'.$rowCount, $v['g1800']);
					$worksheet->SetCellValue('P'.$rowCount, $v['u2100']);
					$worksheet->SetCellValue('Q'.$rowCount, $v['u900']);
					$worksheet->SetCellValue('R'.$rowCount, $v['l1800']);
					$worksheet->SetCellValue('S'.$rowCount, $v['on_air_baseline']);
					$worksheet->SetCellValue('T'.$rowCount, $v['on_air_date']);
					$worksheet->SetCellValue('U'.$rowCount, $v['on_air_week']);
					$worksheet->SetCellValue('V'.$rowCount, $v['ic_issues']);
					$worksheet->SetCellValue('W'.$rowCount, $v['ic_owner']);
					$worksheet->SetCellValue('X'.$rowCount, $v['atp_date']);
					$worksheet->SetCellValue('Y'.$rowCount, $v['atp_method']);
					$worksheet->SetCellValue('Z'.$rowCount, $v['partner_ni']);
					$worksheet->SetCellValue('AA'.$rowCount, $v['indosat_pic']);
					$worksheet->SetCellValue('AB'.$rowCount, $v['update_by']);
					$worksheet->SetCellValue('AC'.$rowCount, $v['update_date']);
					$worksheet->SetCellValue('AD'.$rowCount, $v['uploader_id']);
					$worksheet->SetCellValue('AE'.$rowCount, $v['status']);

				}
			break;
			case "mcr":
				$filename = "export-data-mcr-".$date;
				$objPHPExcel = $objReader->load("__repository/template_export/template-export-mcr.xlsx");
				$worksheet = $objPHPExcel->setActiveSheetIndex(0);
				$rowCount = 5;
			
				foreach($data as $k => $v){
					$rowCount++;
					$worksheet->SetCellValue('A'.$rowCount, $v['id']);
					$worksheet->SetCellValue('B'.$rowCount, $v['boqno']);
					$worksheet->SetCellValue('C'.$rowCount, $v['site_id']);
					$worksheet->SetCellValue('D'.$rowCount, $v['site_name']);
					$worksheet->SetCellValue('E'.$rowCount, $v['sow_category']);
					$worksheet->SetCellValue('F'.$rowCount, $v['site_status']);
					$worksheet->SetCellValue('G'.$rowCount, $v['region_code']);
					$worksheet->SetCellValue('H'.$rowCount, $v['phase_name']);
					$worksheet->SetCellValue('I'.$rowCount, $v['po_ne']);
					$worksheet->SetCellValue('J'.$rowCount, $v['on_air_date']);
					$worksheet->SetCellValue('K'.$rowCount, $v['on_air_unlock']);
					$worksheet->SetCellValue('L'.$rowCount, $v['alarm_submit']);
					$worksheet->SetCellValue('M'.$rowCount, $v['alarm_approved']);
					$worksheet->SetCellValue('N'.$rowCount, $v['ssv_fr_submit']);
					$worksheet->SetCellValue('O'.$rowCount, $v['ssv_vr_approved']);
					$worksheet->SetCellValue('P'.$rowCount, $v['ssv_frftr_submit']);
					$worksheet->SetCellValue('Q'.$rowCount, $v['ftr_srftr_approved']);
					$worksheet->SetCellValue('R'.$rowCount, $v['pmr_lv_submit']);
					$worksheet->SetCellValue('S'.$rowCount, $v['pmr_lv_approved']);
					$worksheet->SetCellValue('T'.$rowCount, $v['rtwp_rssi']);
					$worksheet->SetCellValue('U'.$rowCount, $v['hn_submit']);
					$worksheet->SetCellValue('V'.$rowCount, $v['hn_approved']);
					$worksheet->SetCellValue('W'.$rowCount, $v['mcr_submit']);
					$worksheet->SetCellValue('X'.$rowCount, $v['mcr_exit']);
					$worksheet->SetCellValue('Y'.$rowCount, $v['mcr_issues']);
					$worksheet->SetCellValue('Z'.$rowCount, $v['mcr_pic']);
					$worksheet->SetCellValue('AA'.$rowCount, $v['70_ssv_sr']);
					$worksheet->SetCellValue('AB'.$rowCount, $v['70_ssv_fr']);
					$worksheet->SetCellValue('AC'.$rowCount, $v['71_rssi']);
					$worksheet->SetCellValue('AD'.$rowCount, $v['73_pmr']);
					$worksheet->SetCellValue('AE'.$rowCount, $v['74_alarm_log']);
					$worksheet->SetCellValue('AF'.$rowCount, $v['xx_other3']);
					$worksheet->SetCellValue('AG'.$rowCount, $v['xx_other4']);
					$worksheet->SetCellValue('AH'.$rowCount, $v['update_by']);
					$worksheet->SetCellValue('AI'.$rowCount, $v['update_date']);
					$worksheet->SetCellValue('AJ'.$rowCount, $v['uploader_id']);
					$worksheet->SetCellValue('AK'.$rowCount, $v['status']);


				}
			break;
			case "atf":
				$filename = "export-data-atf-".$date;
				$objPHPExcel = $objReader->load("__repository/template_export/template-export-atf.xlsx");
				$worksheet = $objPHPExcel->setActiveSheetIndex(0);
				$rowCount = 5;
				
				foreach($data as $k => $v){
					$rowCount++;
					$worksheet->SetCellValue('A'.$rowCount, $v['id']);
					$worksheet->SetCellValue('B'.$rowCount, $v['boqno']);
					$worksheet->SetCellValue('C'.$rowCount, $v['site_id']);
					$worksheet->SetCellValue('D'.$rowCount, $v['site_name']);
					$worksheet->SetCellValue('E'.$rowCount, $v['sow_category']);
					$worksheet->SetCellValue('F'.$rowCount, $v['site_status']);
					$worksheet->SetCellValue('G'.$rowCount, $v['region_code']);
					$worksheet->SetCellValue('H'.$rowCount, $v['po_ne']);
					$worksheet->SetCellValue('I'.$rowCount, $v['atf_submit']);
					$worksheet->SetCellValue('J'.$rowCount, $v['atf_approved1']);
					$worksheet->SetCellValue('K'.$rowCount, $v['dismantle']);
					$worksheet->SetCellValue('L'.$rowCount, $v['material_pickup']);
					$worksheet->SetCellValue('M'.$rowCount, $v['material_inbound_nokia']);
					$worksheet->SetCellValue('N'.$rowCount, $v['material_inbound_isat']);
					$worksheet->SetCellValue('O'.$rowCount, $v['atf_approved2']);
					$worksheet->SetCellValue('P'.$rowCount, $v['atf_closed']);
					$worksheet->SetCellValue('Q'.$rowCount, $v['file_name']);
					$worksheet->SetCellValue('R'.$rowCount, $v['update_by']);
					$worksheet->SetCellValue('S'.$rowCount, $v['update_date']);
					$worksheet->SetCellValue('T'.$rowCount, $v['status']);

				}
			break;
			case "sitebinder":
				$filename = "export-data-sitebinder-".$date;
				$objPHPExcel = $objReader->load("__repository/template_export/template-export-sitebinder.xlsx");
				$worksheet = $objPHPExcel->setActiveSheetIndex(0);
				$rowCount = 5;
				
				foreach($data as $k => $v){
					$rowCount++;
					$worksheet->SetCellValue('A'.$rowCount, $v['id']);
					$worksheet->SetCellValue('B'.$rowCount, $v['boqno']);
					$worksheet->SetCellValue('C'.$rowCount, $v['site_id']);
					$worksheet->SetCellValue('D'.$rowCount, $v['site_name']);
					$worksheet->SetCellValue('E'.$rowCount, $v['sow_category']);
					$worksheet->SetCellValue('F'.$rowCount, $v['site_status']);
					$worksheet->SetCellValue('G'.$rowCount, $v['region_code']);
					$worksheet->SetCellValue('H'.$rowCount, $v['phase_name']);
					$worksheet->SetCellValue('I'.$rowCount, $v['po_ne']);
					$worksheet->SetCellValue('J'.$rowCount, $v['cluster']);
					$worksheet->SetCellValue('K'.$rowCount, $v['on_air_date']);
					$worksheet->SetCellValue('L'.$rowCount, $v['atp_date']);
					$worksheet->SetCellValue('M'.$rowCount, $v['atp_method']);
					$worksheet->SetCellValue('N'.$rowCount, $v['partner_ni']);
					$worksheet->SetCellValue('O'.$rowCount, $v['indosat_pic']);
					$worksheet->SetCellValue('P'.$rowCount, $v['10_lld_ndb']);
					$worksheet->SetCellValue('Q'.$rowCount, $v['22_tssr_pdf']);
					$worksheet->SetCellValue('R'.$rowCount, $v['23_sid_pdf']);
					$worksheet->SetCellValue('S'.$rowCount, $v['50_boq_pdf']);
					$worksheet->SetCellValue('T'.$rowCount, $v['56_atf_xls']);
					$worksheet->SetCellValue('U'.$rowCount, $v['56_atf_pdf']);
					$worksheet->SetCellValue('V'.$rowCount, $v['57_atp_functional']);
					$worksheet->SetCellValue('W'.$rowCount, $v['57_atp_physical']);
					$worksheet->SetCellValue('X'.$rowCount, $v['61_redline_pdf']);
					$worksheet->SetCellValue('Y'.$rowCount, $v['62_abd_dwg']);
					$worksheet->SetCellValue('Z'.$rowCount, $v['63_abd_pdf']);
					$worksheet->SetCellValue('AA'.$rowCount, $v['xx_others']);
					$worksheet->SetCellValue('AB'.$rowCount, $v['xx_others2']);
					$worksheet->SetCellValue('AC'.$rowCount, $v['doc_submit']);
					$worksheet->SetCellValue('AD'.$rowCount, $v['reviewer']);
					$worksheet->SetCellValue('AE'.$rowCount, $v['doc_accept']);
					$worksheet->SetCellValue('AF'.$rowCount, $v['doc_status']);
					$worksheet->SetCellValue('AG'.$rowCount, $v['70_ssv']);
					$worksheet->SetCellValue('AH'.$rowCount, $v['71_rssi']);
					$worksheet->SetCellValue('AI'.$rowCount, $v['73_pmr']);
					$worksheet->SetCellValue('AJ'.$rowCount, $v['74_alarm_log']);
					$worksheet->SetCellValue('AK'.$rowCount, $v['xx_others3']);
					$worksheet->SetCellValue('AL'.$rowCount, $v['xx_others4']);
					$worksheet->SetCellValue('AM'.$rowCount, $v['mcr_exit_accept']);
					$worksheet->SetCellValue('AN'.$rowCount, $v['endorse_submit']);
					$worksheet->SetCellValue('AO'.$rowCount, $v['approver']);
					$worksheet->SetCellValue('AP'.$rowCount, $v['endorse_approved']);
					$worksheet->SetCellValue('AQ'.$rowCount, $v['endorse_status']);
					$worksheet->SetCellValue('AR'.$rowCount, $v['dc_submit']);
					$worksheet->SetCellValue('AS'.$rowCount, $v['dc_reviewer']);
					$worksheet->SetCellValue('AT'.$rowCount, $v['dc_approved']);
					$worksheet->SetCellValue('AU'.$rowCount, $v['dc_status']);
					$worksheet->SetCellValue('AV'.$rowCount, $v['oa_to_atp']);
					$worksheet->SetCellValue('AW'.$rowCount, $v['atp_to_submit']);
					$worksheet->SetCellValue('AX'.$rowCount, $v['submit_to_accept']);
					$worksheet->SetCellValue('AY'.$rowCount, $v['accept_to_endorse']);
					$worksheet->SetCellValue('AZ'.$rowCount, $v['endorse_to_dc_approved']);
					$worksheet->SetCellValue('bA'.$rowCount, $v['total_oa_to_dc_approved']);
					$worksheet->SetCellValue('BB'.$rowCount, $v['remarks']);
					$worksheet->SetCellValue('BC'.$rowCount, $v['update_by']);
					$worksheet->SetCellValue('BD'.$rowCount, $v['update_date']);
					$worksheet->SetCellValue('BE'.$rowCount, $v['file_name']);
					$worksheet->SetCellValue('BF'.$rowCount, $v['status']);

				}
			break;
			case "acceptanceclosing":
				$filename = "export-data-acceptanceclosing-".$date;
				$objPHPExcel = $objReader->load("__repository/template_export/template-export-accclosing.xlsx");
				$worksheet = $objPHPExcel->setActiveSheetIndex(0);
				$rowCount = 5;
				
				foreach($data as $k => $v){
					$rowCount++;
					$worksheet->SetCellValue('A'.$rowCount, $v['id']);
					$worksheet->SetCellValue('B'.$rowCount, $v['phase_code']);
					$worksheet->SetCellValue('C'.$rowCount, $v['phase_name']);
					$worksheet->SetCellValue('D'.$rowCount, $v['boqno']);
					$worksheet->SetCellValue('E'.$rowCount, $v['site_id']);
					$worksheet->SetCellValue('F'.$rowCount, $v['site_name']);
					$worksheet->SetCellValue('G'.$rowCount, $v['po_ne']);
					$worksheet->SetCellValue('H'.$rowCount, $v['region_code']);
					$worksheet->SetCellValue('I'.$rowCount, $v['sow_category']);
					$worksheet->SetCellValue('J'.$rowCount, $v['site_status']);
					$worksheet->SetCellValue('K'.$rowCount, $v['on_air_date']);
					$worksheet->SetCellValue('L'.$rowCount, $v['atp_date']);
					$worksheet->SetCellValue('M'.$rowCount, $v['endorse_approved']);
					$worksheet->SetCellValue('N'.$rowCount, $v['mcr_exit_date']);
					$worksheet->SetCellValue('O'.$rowCount, $v['mcr_exit_no']);
					$worksheet->SetCellValue('P'.$rowCount, $v['pac_date']);
					$worksheet->SetCellValue('Q'.$rowCount, $v['pac_no']);
					$worksheet->SetCellValue('R'.$rowCount, $v['fac_date']);
					$worksheet->SetCellValue('S'.$rowCount, $v['fac_no']);
					$worksheet->SetCellValue('T'.$rowCount, $v['top_certificate']);
					$worksheet->SetCellValue('U'.$rowCount, $v['remarks_certificate']);
					$worksheet->SetCellValue('V'.$rowCount, $v['pmis_status']);
					$worksheet->SetCellValue('W'.$rowCount, $v['pmp_status']);
					$worksheet->SetCellValue('X'.$rowCount, $v['babt_submit']);
					$worksheet->SetCellValue('Y'.$rowCount, $v['babt_approved']);
					$worksheet->SetCellValue('Z'.$rowCount, $v['baut1_date']);
					$worksheet->SetCellValue('AA'.$rowCount, $v['baut1_no']);
					$worksheet->SetCellValue('AB'.$rowCount, $v['bast1_date']);
					$worksheet->SetCellValue('AC'.$rowCount, $v['baut2_date']);
					$worksheet->SetCellValue('AD'.$rowCount, $v['baut2_no']);
					$worksheet->SetCellValue('AE'.$rowCount, $v['bast2_date']);
					$worksheet->SetCellValue('AF'.$rowCount, $v['baut3_date']);
					$worksheet->SetCellValue('AG'.$rowCount, $v['baut3_no']);
					$worksheet->SetCellValue('AH'.$rowCount, $v['bast3_date']);
					$worksheet->SetCellValue('AI'.$rowCount, $v['top_baut']);
					$worksheet->SetCellValue('AJ'.$rowCount, $v['remarks_baut']);
					$worksheet->SetCellValue('AK'.$rowCount, $v['invoice1_date']);
					$worksheet->SetCellValue('AL'.$rowCount, $v['invoice1_no']);
					$worksheet->SetCellValue('AM'.$rowCount, $v['remittance1_date']);
					$worksheet->SetCellValue('AN'.$rowCount, $v['invoice2_date']);
					$worksheet->SetCellValue('AO'.$rowCount, $v['invoice2_no']);
					$worksheet->SetCellValue('AP'.$rowCount, $v['remittance2_date']);
					$worksheet->SetCellValue('AQ'.$rowCount, $v['invoice3_date']);
					$worksheet->SetCellValue('AR'.$rowCount, $v['invoice3_no']);
					$worksheet->SetCellValue('AS'.$rowCount, $v['remittance3_date']);
					$worksheet->SetCellValue('AT'.$rowCount, $v['top_invoice']);
					$worksheet->SetCellValue('AU'.$rowCount, $v['remarks_invoice']);
					$worksheet->SetCellValue('AV'.$rowCount, $v['update_by']);
					$worksheet->SetCellValue('AW'.$rowCount, $v['update_date']);
					$worksheet->SetCellValue('AX'.$rowCount, $v['status']);
				}
			break;case "costsales":
				$filename = "export-data-costsales-".$date;
				$objPHPExcel = $objReader->load("__repository/template_export/template-export-costsales.xlsx");
				$worksheet = $objPHPExcel->setActiveSheetIndex(0);
				$rowCount = 5;
				
				foreach($data as $k => $v){
					$rowCount++;
					$worksheet->SetCellValue('A'.$rowCount, $v['id']);
					$worksheet->SetCellValue('B'.$rowCount, $v['phase_code']);
					$worksheet->SetCellValue('C'.$rowCount, $v['phase_name']);
					$worksheet->SetCellValue('D'.$rowCount, $v['boqno']);
					$worksheet->SetCellValue('E'.$rowCount, $v['site_id']);
					$worksheet->SetCellValue('F'.$rowCount, $v['site_name']);
					$worksheet->SetCellValue('G'.$rowCount, $v['po_ne']);
					$worksheet->SetCellValue('H'.$rowCount, $v['region_code']);
					$worksheet->SetCellValue('I'.$rowCount, $v['sow_category']);
					$worksheet->SetCellValue('J'.$rowCount, $v['site_status']);
					$worksheet->SetCellValue('K'.$rowCount, $v['on_air_baseline']);
					$worksheet->SetCellValue('L'.$rowCount, $v['on_air_date']);
					$worksheet->SetCellValue('M'.$rowCount, $v['pac_baseline']);
					$worksheet->SetCellValue('N'.$rowCount, $v['pac_date2']);
					$worksheet->SetCellValue('O'.$rowCount, $v['delay_no_onair']);
					$worksheet->SetCellValue('P'.$rowCount, $v['delay_on_days']);
					$worksheet->SetCellValue('Q'.$rowCount, $v['delay_no_pac']);
					$worksheet->SetCellValue('R'.$rowCount, $v['delay_on_days2']);
					$worksheet->SetCellValue('S'.$rowCount, $v['target_sales']);
					$worksheet->SetCellValue('T'.$rowCount, $v['actual_sales']);
					$worksheet->SetCellValue('U'.$rowCount, $v['target_cost']);
					$worksheet->SetCellValue('V'.$rowCount, $v['actual_cost']);
					$worksheet->SetCellValue('W'.$rowCount, $v['remarks']);
					$worksheet->SetCellValue('X'.$rowCount, $v['update_by']);
					$worksheet->SetCellValue('Y'.$rowCount, $v['update_date']);
					$worksheet->SetCellValue('Z'.$rowCount, $v['status']);
				}
			break;
			case "receivedall":
				$filename = "export-data-receivedall-".$date;
				$objPHPExcel = $objReader->load("__repository/template_export/template-export-receivedall.xlsx");
				$worksheet = $objPHPExcel->setActiveSheetIndex(0);
				$rowCount = 5;
				
			foreach($data as $k => $v){
					$rowCount++;
					$worksheet->SetCellValue('A'.$rowCount, $v['id']);
					$worksheet->SetCellValue('B'.$rowCount, $v['id_reff1']);
					$worksheet->SetCellValue('C'.$rowCount, $v['id_reff2']);
					$worksheet->SetCellValue('D'.$rowCount, $v['level']);
					$worksheet->SetCellValue('E'.$rowCount, $v['phase_code']);
					$worksheet->SetCellValue('F'.$rowCount, $v['phase_year']);
					$worksheet->SetCellValue('G'.$rowCount, $v['phase_name']);
					$worksheet->SetCellValue('H'.$rowCount, $v['po_type']);
					$worksheet->SetCellValue('I'.$rowCount, $v['pr_number']);
					$worksheet->SetCellValue('J'.$rowCount, $v['pr_line_item']);
					$worksheet->SetCellValue('K'.$rowCount, $v['po_no']);
					$worksheet->SetCellValue('L'.$rowCount, $v['project_name']);
					$worksheet->SetCellValue('M'.$rowCount, $v['purchasing_group']);
					$worksheet->SetCellValue('N'.$rowCount, $v['document_type']);
					$worksheet->SetCellValue('O'.$rowCount, $v['vendor_account_number']);
					$worksheet->SetCellValue('P'.$rowCount, $v['contact_person']);
					$worksheet->SetCellValue('Q'.$rowCount, $v['term_of_payment']);
					$worksheet->SetCellValue('R'.$rowCount, $v['incoterms_code']);
					$worksheet->SetCellValue('S'.$rowCount, $v['incoterms_location']);
					$worksheet->SetCellValue('T'.$rowCount, $v['currency']);
					$worksheet->SetCellValue('U'.$rowCount, $v['implementer']);
					$worksheet->SetCellValue('V'.$rowCount, $v['manager']);
					$worksheet->SetCellValue('W'.$rowCount, $v['document_text_free_text_notes']);
					$worksheet->SetCellValue('X'.$rowCount, $v['collective_no']);
					$worksheet->SetCellValue('Y'.$rowCount, $v['discount_type_header']);
					$worksheet->SetCellValue('Z'.$rowCount, $v['discount_amount_percentage_header']);
					$worksheet->SetCellValue('AA'.$rowCount, $v['line_item']);
					$worksheet->SetCellValue('AB'.$rowCount, $v['requester']);
					$worksheet->SetCellValue('AC'.$rowCount, $v['rfx_auction_number']);
					$worksheet->SetCellValue('AD'.$rowCount, $v['contract_number']);
					$worksheet->SetCellValue('AE'.$rowCount, $v['account_assignment_category']);
					$worksheet->SetCellValue('AF'.$rowCount, $v['item_category']);
					$worksheet->SetCellValue('AG'.$rowCount, $v['tax_code']);
					$worksheet->SetCellValue('AH'.$rowCount, $v['material_number']);
					$worksheet->SetCellValue('AI'.$rowCount, $v['short_text']);
					$worksheet->SetCellValue('AJ'.$rowCount, $v['item_text']);
					$worksheet->SetCellValue('AK'.$rowCount, $v['limitt']);
					$worksheet->SetCellValue('AL'.$rowCount, $v['materials_quantity']);
					$worksheet->SetCellValue('AM'.$rowCount, $v['material_price']);
					$worksheet->SetCellValue('AN'.$rowCount, $v['material_group']);
					$worksheet->SetCellValue('AO'.$rowCount, $v['plant']);
					$worksheet->SetCellValue('AP'.$rowCount, $v['delivery_date']);
					$worksheet->SetCellValue('AQ'.$rowCount, $v['require_gr']);
					$worksheet->SetCellValue('AR'.$rowCount, $v['invoice_receipt']);
					$worksheet->SetCellValue('AS'.$rowCount, $v['discount_type_item']);
					$worksheet->SetCellValue('AT'.$rowCount, $v['amount_percentage_item']);
					$worksheet->SetCellValue('AU'.$rowCount, $v['indicator']);
					$worksheet->SetCellValue('AV'.$rowCount, $v['assigned_to_line_item']);
					$worksheet->SetCellValue('AW'.$rowCount, $v['service_number']);
					$worksheet->SetCellValue('AX'.$rowCount, $v['services_quantity']);
					$worksheet->SetCellValue('AY'.$rowCount, $v['gross_price']);
					$worksheet->SetCellValue('AZ'.$rowCount, $v['gl_account_number']);
					$worksheet->SetCellValue('bA'.$rowCount, $v['business_area']);
					$worksheet->SetCellValue('BB'.$rowCount, $v['cost_center']);
					$worksheet->SetCellValue('BC'.$rowCount, $v['wbs']);
					$worksheet->SetCellValue('BD'.$rowCount, $v['internal_order']);
					$worksheet->SetCellValue('BE'.$rowCount, $v['assets_number']);
					$worksheet->SetCellValue('BF'.$rowCount, $v['network_number']);
					$worksheet->SetCellValue('BG'.$rowCount, $v['activity_number']);
					$worksheet->SetCellValue('BH'.$rowCount, $v['assigned_to_line_item2']);
					$worksheet->SetCellValue('BI'.$rowCount, $v['invoicing_plan_date']);
					$worksheet->SetCellValue('BJ'.$rowCount, $v['percentage_to_be_invoiced']);
					$worksheet->SetCellValue('BK'.$rowCount, $v['values_to_be_invoiced']);
					$worksheet->SetCellValue('BL'.$rowCount, $v['buyer']);
					$worksheet->SetCellValue('BM'.$rowCount, $v['basic_contract']);
					$worksheet->SetCellValue('BN'.$rowCount, $v['actual_qty']);
					$worksheet->SetCellValue('BO'.$rowCount, $v['delta_qty']);
					$worksheet->SetCellValue('BP'.$rowCount, $v['status_cr_qty']);
					$worksheet->SetCellValue('BQ'.$rowCount, $v['remarkscr']);
					$worksheet->SetCellValue('BR'.$rowCount, $v['cr_no_nokia']);
					$worksheet->SetCellValue('BS'.$rowCount, $v['cr_status']);
					$worksheet->SetCellValue('BT'.$rowCount, $v['material_gross_price']);
					$worksheet->SetCellValue('BU'.$rowCount, $v['material_nett_price']);
					$worksheet->SetCellValue('BV'.$rowCount, $v['total_gross_price']);
					$worksheet->SetCellValue('BW'.$rowCount, $v['total_nett_price']);
					$worksheet->SetCellValue('BX'.$rowCount, $v['total_net_actual']);
					$worksheet->SetCellValue('BY'.$rowCount, $v['total_net_delta']);
					$worksheet->SetCellValue('BZ'.$rowCount, $v['update_by']);
					$worksheet->SetCellValue('CA'.$rowCount, $v['update_date']);
					$worksheet->SetCellValue('CB'.$rowCount, $v['uploader_id']);
					$worksheet->SetCellValue('CC'.$rowCount, $v['status']);
				}
			break;

			case "receiveddollar":
				$filename = "export-data-received-with-price-".$date;
				$objPHPExcel = $objReader->load("__repository/template_export/template-export-receiveddollar.xlsx");
				$worksheet = $objPHPExcel->setActiveSheetIndex(0);
				$rowCount = 5;

			foreach($data as $k => $v){
					$rowCount++;
					$worksheet->SetCellValue('A'.$rowCount, $v['id']);
					$worksheet->SetCellValue('B'.$rowCount, $v['level']);
					$worksheet->SetCellValue('C'.$rowCount, $v['phase_name']);
					$worksheet->SetCellValue('D'.$rowCount, $v['project_name']);
					$worksheet->SetCellValue('E'.$rowCount, $v['po_type']);
					$worksheet->SetCellValue('F'.$rowCount, $v['po_no']);
					$worksheet->SetCellValue('G'.$rowCount, $v['line_item']);
					$worksheet->SetCellValue('H'.$rowCount, $v['material_number']);
					$worksheet->SetCellValue('I'.$rowCount, $v['item_text']);
					$worksheet->SetCellValue('J'.$rowCount, $v['short_text']);
					$worksheet->SetCellValue('K'.$rowCount, $v['network_number']);
					$worksheet->SetCellValue('L'.$rowCount, $v['materials_quantity']);
					$worksheet->SetCellValue('M'.$rowCount, $v['actual_qty']);
					$worksheet->SetCellValue('N'.$rowCount, $v['delta_qty']);
					$worksheet->SetCellValue('O'.$rowCount, $v['status_cr_qty']);
					$worksheet->SetCellValue('P'.$rowCount, $v['remarkscr']);
					$worksheet->SetCellValue('Q'.$rowCount, $v['cr_no_nokia']);
					$worksheet->SetCellValue('R'.$rowCount, $v['cr_status']);
					$worksheet->SetCellValue('S'.$rowCount, $v['currency']);
					$worksheet->SetCellValue('T'.$rowCount, $v['material_gross_price']);
					$worksheet->SetCellValue('U'.$rowCount, $v['material_nett_price']);
					$worksheet->SetCellValue('V'.$rowCount, $v['total_gross_price']);
					$worksheet->SetCellValue('W'.$rowCount, $v['total_nett_price']);
					$worksheet->SetCellValue('X'.$rowCount, $v['total_net_actual']);
					$worksheet->SetCellValue('Y'.$rowCount, $v['total_net_delta']);
					$worksheet->SetCellValue('Z'.$rowCount, $v['update_by']);
					$worksheet->SetCellValue('AA'.$rowCount, $v['update_date']);
					$worksheet->SetCellValue('AB'.$rowCount, $v['uploader_id']);
					$worksheet->SetCellValue('AC'.$rowCount, $v['status']);
				}
			break;
			case "received":
				$filename = "export-data-received-".$date;
				$objPHPExcel = $objReader->load("__repository/template_export/template-export-received.xlsx");
				$worksheet = $objPHPExcel->setActiveSheetIndex(0);
				$rowCount = 5;
				
			foreach($data as $k => $v){
					$rowCount++;
					$worksheet->SetCellValue('A'.$rowCount, $v['id']);
					$worksheet->SetCellValue('B'.$rowCount, $v['level']);
					$worksheet->SetCellValue('C'.$rowCount, $v['phase_name']);
					$worksheet->SetCellValue('D'.$rowCount, $v['project_name']);
					$worksheet->SetCellValue('E'.$rowCount, $v['po_type']);
					$worksheet->SetCellValue('F'.$rowCount, $v['po_no']);
					$worksheet->SetCellValue('G'.$rowCount, $v['line_item']);
					$worksheet->SetCellValue('H'.$rowCount, $v['material_number']);
					$worksheet->SetCellValue('I'.$rowCount, $v['item_text']);
					$worksheet->SetCellValue('J'.$rowCount, $v['short_text']);
					$worksheet->SetCellValue('K'.$rowCount, $v['network_number']);
					$worksheet->SetCellValue('L'.$rowCount, $v['materials_quantity']);
					$worksheet->SetCellValue('M'.$rowCount, $v['actual_qty']);
					$worksheet->SetCellValue('N'.$rowCount, $v['delta_qty']);
					$worksheet->SetCellValue('O'.$rowCount, $v['status_cr_qty']);
					$worksheet->SetCellValue('P'.$rowCount, $v['remarkscr']);
					$worksheet->SetCellValue('Q'.$rowCount, $v['cr_no_nokia']);
					$worksheet->SetCellValue('R'.$rowCount, $v['cr_status']);
					$worksheet->SetCellValue('S'.$rowCount, $v['update_by']);
					$worksheet->SetCellValue('T'.$rowCount, $v['update_date']);
					$worksheet->SetCellValue('U'.$rowCount, $v['uploader_id']);
					$worksheet->SetCellValue('V'.$rowCount, $v['status']);
				}
			break;
			case "reservationall":
				$filename = "export-data-reservation-all-".$date;
				$objPHPExcel = $objReader->load("__repository/template_export/template-export-reservationall.xlsx");
				$worksheet = $objPHPExcel->setActiveSheetIndex(0);
				$rowCount = 5;
				
			foreach($data as $k => $v){
					$rowCount++;
					$worksheet->SetCellValue('A'.$rowCount, $v['id']);
					$worksheet->SetCellValue('B'.$rowCount, $v['id_reff1']);
					$worksheet->SetCellValue('C'.$rowCount, $v['id_reff2']);
					$worksheet->SetCellValue('D'.$rowCount, $v['level']);
					//$worksheet->SetCellValue('E'.$rowCount, $v['phase_code']);
					//$worksheet->SetCellValue('F'.$rowCount, $v['phase_year']);
					//$worksheet->SetCellValue('G'.$rowCount, $v['phase_name']);
					//$worksheet->SetCellValue('H'.$rowCount, $v['po_type']);
					$worksheet->SetCellValue('I'.$rowCount, $v['pr_number']);
					$worksheet->SetCellValue('J'.$rowCount, $v['pr_line_item']);
					//$worksheet->SetCellValue('K'.$rowCount, $v['po_no']);
					//$worksheet->SetCellValue('L'.$rowCount, $v['project_name']);
					$worksheet->SetCellValue('M'.$rowCount, $v['purchasinggroup_rcv']);
					$worksheet->SetCellValue('N'.$rowCount, $v['documenttype_rcv']);
					$worksheet->SetCellValue('O'.$rowCount, $v['vendoraccountnumber_rcv']);
					$worksheet->SetCellValue('P'.$rowCount, $v['contactperson_rcv']);
					$worksheet->SetCellValue('Q'.$rowCount, $v['termofpayment_rcv']);
					$worksheet->SetCellValue('R'.$rowCount, $v['incotermscode_rcv']);
					$worksheet->SetCellValue('S'.$rowCount, $v['incotermslocation_rcv']);
					//$worksheet->SetCellValue('T'.$rowCount, $v['currency']);
					$worksheet->SetCellValue('U'.$rowCount, $v['implementer_rcv']);
					$worksheet->SetCellValue('V'.$rowCount, $v['manager_rcv']);
					$worksheet->SetCellValue('W'.$rowCount, $v['documenttextfreetextnotes_rcv']);
					$worksheet->SetCellValue('X'.$rowCount, $v['collectiveno_rcv']);
					$worksheet->SetCellValue('Y'.$rowCount, $v['discounttypeheader_rcv']);
					$worksheet->SetCellValue('Z'.$rowCount, $v['discountamountpercentageheader_rcv']);
					$worksheet->SetCellValue('AA'.$rowCount, $v['lineitem_rcv']);
					$worksheet->SetCellValue('AB'.$rowCount, $v['requester_rcv']);
					$worksheet->SetCellValue('AC'.$rowCount, $v['rfxauctionnumber_rcv']);
					$worksheet->SetCellValue('AD'.$rowCount, $v['contractnumber_rcv']);
					$worksheet->SetCellValue('AE'.$rowCount, $v['accountassignmentcategory_rcv']);
					$worksheet->SetCellValue('AF'.$rowCount, $v['itemcategory_rcv']);
					$worksheet->SetCellValue('AG'.$rowCount, $v['taxcode_rcv']);
					$worksheet->SetCellValue('AH'.$rowCount, $v['materialnumber_rcv']);
					$worksheet->SetCellValue('AI'.$rowCount, $v['shorttext_rcv']);
					$worksheet->SetCellValue('AJ'.$rowCount, $v['itemtext_rcv']);
					$worksheet->SetCellValue('AK'.$rowCount, $v['limit_rcv']);
					$worksheet->SetCellValue('AL'.$rowCount, $v['materialsquantity_rcv']);
					$worksheet->SetCellValue('AM'.$rowCount, $v['materialprice_rcv']);
					$worksheet->SetCellValue('AN'.$rowCount, $v['materialgroup_rcv']);
					$worksheet->SetCellValue('AO'.$rowCount, $v['plant_rcv']);
					$worksheet->SetCellValue('AP'.$rowCount, $v['deliverydate_rcv']);
					$worksheet->SetCellValue('AQ'.$rowCount, $v['requiregr_rcv']);
					$worksheet->SetCellValue('AR'.$rowCount, $v['invoicereceipt_rcv']);
					$worksheet->SetCellValue('AS'.$rowCount, $v['discounttypeitem_rcv']);
					$worksheet->SetCellValue('AT'.$rowCount, $v['amountpercentageitem_rcv']);
					$worksheet->SetCellValue('AU'.$rowCount, $v['indicator_rcv']);
					$worksheet->SetCellValue('AV'.$rowCount, $v['assignedtolineitem_rcv']);
					$worksheet->SetCellValue('AW'.$rowCount, $v['servicenumber_rcv']);
					$worksheet->SetCellValue('AX'.$rowCount, $v['servicesquantity_rcv']);
					$worksheet->SetCellValue('AY'.$rowCount, $v['grossprice_rcv']);
					$worksheet->SetCellValue('AZ'.$rowCount, $v['glaccountnumber_rcv']);
					$worksheet->SetCellValue('bA'.$rowCount, $v['businessarea_rcv']);
					$worksheet->SetCellValue('BB'.$rowCount, $v['costcenter_rcv']);
					$worksheet->SetCellValue('BC'.$rowCount, $v['wbs_rcv']);
					$worksheet->SetCellValue('BD'.$rowCount, $v['internalorder_rcv']);
					$worksheet->SetCellValue('BE'.$rowCount, $v['assetsnumber_rcv']);
					$worksheet->SetCellValue('BF'.$rowCount, $v['networknumber_rcv']);
					$worksheet->SetCellValue('BG'.$rowCount, $v['activitynumber_rcv']);
					$worksheet->SetCellValue('BH'.$rowCount, $v['assignedtolineitem2_rcv']);
					$worksheet->SetCellValue('BI'.$rowCount, $v['invoicingplandate_rcv']);
					$worksheet->SetCellValue('BJ'.$rowCount, $v['percentagetobeinvoiced_rcv']);
					$worksheet->SetCellValue('BK'.$rowCount, $v['valuestobeinvoiced_rcv']);
					$worksheet->SetCellValue('BL'.$rowCount, $v['buyer_rcv']);
					//$worksheet->SetCellValue('BM'.$rowCount, $v['basic_contract']);
					$worksheet->SetCellValue('BN'.$rowCount, $v['actualqty_rcv']);
					$worksheet->SetCellValue('BO'.$rowCount, $v['deltaqty_rcv']);
					$worksheet->SetCellValue('BP'.$rowCount, $v['statuscrqty_rcv']);
					$worksheet->SetCellValue('BQ'.$rowCount, $v['remarkscr_rcv']);
					//$worksheet->SetCellValue('BR'.$rowCount, $v['cr_no_nokia']);
					//$worksheet->SetCellValue('BS'.$rowCount, $v['cr_status']);
					$worksheet->SetCellValue('BT'.$rowCount, $v['materialgrossprice_rcv']);
					$worksheet->SetCellValue('BU'.$rowCount, $v['materialnettprice_rcv']);
					$worksheet->SetCellValue('BV'.$rowCount, $v['totalgrossprice_rcv']);
					$worksheet->SetCellValue('BW'.$rowCount, $v['totalnettprice_rcv']);
					$worksheet->SetCellValue('BX'.$rowCount, $v['totalnetactual_rcv']);
					$worksheet->SetCellValue('BY'.$rowCount, $v['totalnetdelta_rcv']);
					$worksheet->SetCellValue('BZ'.$rowCount, $v['boqno']);
					$worksheet->SetCellValue('CA'.$rowCount, $v['site_id']);
					$worksheet->SetCellValue('CB'.$rowCount, $v['site_name']);
					//$worksheet->SetCellValue('CC'.$rowCount, $v['region_code']);
					$worksheet->SetCellValue('CD'.$rowCount, $v['network_boq']);
					$worksheet->SetCellValue('CE'.$rowCount, $v['wp_id_svc']);
					$worksheet->SetCellValue('CF'.$rowCount, $v['plan_qty_mapping']);
					$worksheet->SetCellValue('CG'.$rowCount, $v['aqtual_qty_mapping']);
					$worksheet->SetCellValue('CH'.$rowCount, $v['delta_qty_mapping']);
					$worksheet->SetCellValue('CI'.$rowCount, $v['status_cr_qty_mapping']);
					$worksheet->SetCellValue('CJ'.$rowCount, $v['status_cr_reloc_mapping']);
					$worksheet->SetCellValue('CK'.$rowCount, $v['remarks_cr_mapping']);
					$worksheet->SetCellValue('CL'.$rowCount, $v['remarks_cr_reloc_mapping']);
					$worksheet->SetCellValue('CM'.$rowCount, $v['total_gross_price_mapping']);
					$worksheet->SetCellValue('CN'.$rowCount, $v['total_nett_price_mapping']);
					$worksheet->SetCellValue('CO'.$rowCount, $v['total_nett_actual_mapping']);
					$worksheet->SetCellValue('CP'.$rowCount, $v['total_net_delta_mapping']);
					$worksheet->SetCellValue('CQ'.$rowCount, $v['boqno_old']);
					$worksheet->SetCellValue('CR'.$rowCount, $v['site_id_old']);
					$worksheet->SetCellValue('CS'.$rowCount, $v['site_name_old']);
					$worksheet->SetCellValue('CT'.$rowCount, $v['region_code_old']);
					$worksheet->SetCellValue('CU'.$rowCount, $v['update_by']);
					$worksheet->SetCellValue('CV'.$rowCount, $v['update_date']);
					$worksheet->SetCellValue('CW'.$rowCount, $v['uploader_id']);
					$worksheet->SetCellValue('CX'.$rowCount, $v['status']);
				}
			break;
			case "reservationdollar":
				$filename = "export-data-reservation-with_price-".$date;
				$objPHPExcel = $objReader->load("__repository/template_export/template-export-reservationdollar.xlsx");
				$worksheet = $objPHPExcel->setActiveSheetIndex(0);
				$rowCount = 5;
				
			foreach($data as $k => $v){
					$rowCount++;
					$worksheet->SetCellValue('A'.$rowCount, $v['id']);
					$worksheet->SetCellValue('B'.$rowCount, $v['id_reff1']);
					$worksheet->SetCellValue('C'.$rowCount, $v['level']);
					//$worksheet->SetCellValue('D'.$rowCount, $v['phase_name']);
					$worksheet->SetCellValue('E'.$rowCount, $v['boqno']);
					$worksheet->SetCellValue('F'.$rowCount, $v['site_id']);
					$worksheet->SetCellValue('G'.$rowCount, $v['site_name']);
					//$worksheet->SetCellValue('H'.$rowCount, $v['region_code']);
					$worksheet->SetCellValue('I'.$rowCount, $v['network_boq']);
					$worksheet->SetCellValue('J'.$rowCount, $v['wp_id_svc']);
					//$worksheet->SetCellValue('K'.$rowCount, $v['project_name']);
					//$worksheet->SetCellValue('L'.$rowCount, $v['po_type']);
					//$worksheet->SetCellValue('M'.$rowCount, $v['po_no']);
					$worksheet->SetCellValue('N'.$rowCount, $v['lineitem_rcv']);
					$worksheet->SetCellValue('O'.$rowCount, $v['materialnumber_rcv']);
					$worksheet->SetCellValue('P'.$rowCount, $v['itemtext_rcv']);
					$worksheet->SetCellValue('Q'.$rowCount, $v['shorttext_rcv']);
					$worksheet->SetCellValue('R'.$rowCount, $v['networknumber_rcv']);
					$worksheet->SetCellValue('S'.$rowCount, $v['plan_qty_mapping']);
					$worksheet->SetCellValue('T'.$rowCount, $v['aqtual_qty_mapping']);
					$worksheet->SetCellValue('U'.$rowCount, $v['delta_qty_mapping']);
					$worksheet->SetCellValue('V'.$rowCount, $v['status_cr_qty_mapping']);
					$worksheet->SetCellValue('W'.$rowCount, $v['status_cr_reloc_mapping']);
					$worksheet->SetCellValue('X'.$rowCount, $v['remarks_cr_mapping']);
					$worksheet->SetCellValue('Y'.$rowCount, $v['remarks_cr_reloc_mapping']);
					//$worksheet->SetCellValue('Z'.$rowCount, $v['currency']);
					$worksheet->SetCellValue('AA'.$rowCount, $v['materialgrossprice_rcv']);
					$worksheet->SetCellValue('AB'.$rowCount, $v['materialnettprice_rcv']);
					$worksheet->SetCellValue('AC'.$rowCount, $v['total_gross_price_mapping']);
					$worksheet->SetCellValue('AD'.$rowCount, $v['total_nett_price_mapping']);
					$worksheet->SetCellValue('AE'.$rowCount, $v['total_nett_actual_mapping']);
					$worksheet->SetCellValue('AF'.$rowCount, $v['total_net_delta_mapping']);
					$worksheet->SetCellValue('AG'.$rowCount, $v['boqno_old']);
					$worksheet->SetCellValue('AH'.$rowCount, $v['site_id_old']);
					$worksheet->SetCellValue('AI'.$rowCount, $v['site_name_old']);
					$worksheet->SetCellValue('AJ'.$rowCount, $v['region_code_old']);
					$worksheet->SetCellValue('AK'.$rowCount, $v['update_by']);
					$worksheet->SetCellValue('AL'.$rowCount, $v['update_date']);
					$worksheet->SetCellValue('AM'.$rowCount, $v['uploader_id']);
					$worksheet->SetCellValue('AN'.$rowCount, $v['status']);
				}
			break;
			case "reservation":
				$filename = "export-data-reservation-".$date;
				$objPHPExcel = $objReader->load("__repository/template_export/template-export-reservation.xlsx");
				$worksheet = $objPHPExcel->setActiveSheetIndex(0);
				$rowCount = 5;
				
			foreach($data as $k => $v){
					$rowCount++;
					$worksheet->SetCellValue('A'.$rowCount, $v['id']);
					$worksheet->SetCellValue('B'.$rowCount, $v['id_reff1']);
					$worksheet->SetCellValue('C'.$rowCount, $v['level']);
					//$worksheet->SetCellValue('D'.$rowCount, $v['phase_name']);
					$worksheet->SetCellValue('E'.$rowCount, $v['boqno']);
					$worksheet->SetCellValue('F'.$rowCount, $v['site_id']);
					$worksheet->SetCellValue('G'.$rowCount, $v['site_name']);
					//$worksheet->SetCellValue('H'.$rowCount, $v['region_code']);
					$worksheet->SetCellValue('I'.$rowCount, $v['network_boq']);
					$worksheet->SetCellValue('J'.$rowCount, $v['wp_id_svc']);
					//$worksheet->SetCellValue('K'.$rowCount, $v['project_name']);
					//$worksheet->SetCellValue('L'.$rowCount, $v['po_type']);
					//$worksheet->SetCellValue('M'.$rowCount, $v['po_no']);
					$worksheet->SetCellValue('N'.$rowCount, $v['lineitem_rcv']);
					$worksheet->SetCellValue('O'.$rowCount, $v['materialnumber_rcv']);
					$worksheet->SetCellValue('P'.$rowCount, $v['itemtext_rcv']);
					$worksheet->SetCellValue('Q'.$rowCount, $v['shorttext_rcv']);
					$worksheet->SetCellValue('R'.$rowCount, $v['networknumber_rcv']);
					$worksheet->SetCellValue('S'.$rowCount, $v['plan_qty_mapping']);
					$worksheet->SetCellValue('T'.$rowCount, $v['aqtual_qty_mapping']);
					$worksheet->SetCellValue('U'.$rowCount, $v['delta_qty_mapping']);
					$worksheet->SetCellValue('V'.$rowCount, $v['status_cr_qty_mapping']);
					$worksheet->SetCellValue('W'.$rowCount, $v['status_cr_reloc_mapping']);
					$worksheet->SetCellValue('X'.$rowCount, $v['remarks_cr_mapping']);
					$worksheet->SetCellValue('Y'.$rowCount, $v['remarks_cr_reloc_mapping']);
					$worksheet->SetCellValue('Z'.$rowCount, $v['boqno_old']);
					$worksheet->SetCellValue('AA'.$rowCount, $v['site_id_old']);
					$worksheet->SetCellValue('AB'.$rowCount, $v['site_name_old']);
					$worksheet->SetCellValue('AC'.$rowCount, $v['region_code_old']);
					$worksheet->SetCellValue('AD'.$rowCount, $v['update_by']);
					$worksheet->SetCellValue('AE'.$rowCount, $v['update_date']);
					$worksheet->SetCellValue('AF'.$rowCount, $v['uploader_id']);
					$worksheet->SetCellValue('AG'.$rowCount, $v['status']);
				}
			break;
		}
		
		header("Pragma: public");
		header("Expires: 0");
		header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
		header("Content-Type: application/force-download");
		header("Content-Type: application/octet-stream");
		header("Content-Type: application/download");;
		header("Content-Disposition: attachment;filename=$filename.xlsx");
		header("Content-Transfer-Encoding: binary ");
		$objWriter = new PHPExcel_Writer_Excel2007($objPHPExcel); 
		//$objWriter->setOffice2003Compatibility(true);
		$objWriter->save('php://output');
	}		
	
	function simpandata($p1="",$p2="",$p3=""){
		if($this->input->post('mod'))$p1=$this->input->post('mod');
		$post = array();
        foreach($_POST as $k=>$v){
			if($this->input->post($k)!=""){
				//$post[$k] = $this->db->escape_str($this->input->post($k));
				$post[$k] = $this->input->post($k);
			}
		}
		if(isset($post['editstatus'])){$editstatus = $post['editstatus'];unset($post['editstatus']);}
		else $editstatus = $p2;
		
		echo $this->mbackend->simpandata($p1, $post, $editstatus, $p3);
	}
	
	function importdata($p1=""){
		$p1 = $this->input->post('typeimport');
		$import = $this->mbackend->importdata($p1);
		
		if($import == 1){
			echo $import;
		}else{
			$this->nsmarty->assign('type', $p1);
			$this->nsmarty->assign('data', $import);
			$this->nsmarty->display("backend/modul/".$this->input->post('folder')."/hasil_import.html");
			
			/*
			echo "<pre>";
			print_r($import);
			//*/
		}
	}
	
	function getcombobox($type=""){
		$datacombo = $this->mbackend->get_combo($type);
		echo json_encode($datacombo);
	}
	
	function download($type=""){
		$this->load->helper('download');
		$data = file_get_contents("__repository/template/temp_".$type.".xlsx");
		$name = "temp_".$type.".xlsx";
		force_download($name, $data);
	}
	
	function setautoincrement(){
		$table = $this->db->list_tables();
		foreach($table as $k){
			if($k != 'tbl_user'){
				$sql = "Alter table ".$k." auto_increment = 100001";
				$this->db->query($sql);
			}
		}
	}
	
	function test(){
		print_r($this->auth);
	}
	
}
