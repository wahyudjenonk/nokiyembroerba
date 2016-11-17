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
					case "form-upload":
						if($editstatus == 'edit'){
							$data = $this->db->get_where('tbl_upload_database', array('id'=>$id))->row_array();
							$this->nsmarty->assign("data", $data);
						}						
					break;	
				}
			break;
		}
		
		$this->nsmarty->assign("main", $p1);
		$this->nsmarty->assign("submodul", $p2);
		$this->nsmarty->assign("editstatus", $editstatus);
		$this->nsmarty->assign("acak", md5(date('H:i:s')) );
		if(!file_exists($this->config->item('appl').APPPATH.'views/'.$temp)){$this->nsmarty->display('konstruksi.html');}
		
		if($display == true){
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

		switch($p1){
			case "masterpo":
				$filename = "export-data-masterpo";
				$objPHPExcel = $objReader->load("__repository/template_export/template-export-masterpo.xlsx");
				$worksheet = $objPHPExcel->setActiveSheetIndex(0);
				$rowCount = 9;
				$headerStyle = array(
					'fill' => array(
							'type' => PHPExcel_Style_Fill::FILL_SOLID,
							'color' => array('rgb'=>'BFBFBF'),
					),
					'font' => array(
							'bold' => true,
					)
				);
				
				$worksheet->SetCellValue('A'.$rowCount,'ID');
				$worksheet->getStyle('A'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('B'.$rowCount,'PO No.');
				$worksheet->getStyle('B'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('C'.$rowCount,'Phase Code');
				$worksheet->getStyle('C'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('D'.$rowCount,'Phase Name');
				$worksheet->getStyle('D'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('E'.$rowCount,'Year');
				$worksheet->getStyle('E'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('F'.$rowCount,'PO Type.');
				$worksheet->getStyle('F'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('G'.$rowCount,'Project Name');
				$worksheet->getStyle('G'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('H'.$rowCount,'Currency');
				$worksheet->getStyle('H'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('I'.$rowCount,'Basic Contract');
				$worksheet->getStyle('I'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('J'.$rowCount,'PO Date');
				$worksheet->getStyle('J'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('K'.$rowCount,'PO Received');
				$worksheet->getStyle('K'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('L'.$rowCount,'PO Delivery');
				$worksheet->getStyle('L'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('M'.$rowCount,'Revisi On No');
				$worksheet->getStyle('M'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('N'.$rowCount,'PO Gross IDR');
				$worksheet->getStyle('N'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('O'.$rowCount,'PO Nett IDR');
				$worksheet->getStyle('O'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('P'.$rowCount,'Jis Dorr Rate');
				$worksheet->getStyle('P'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('Q'.$rowCount,'PO Gross USD');
				$worksheet->getStyle('Q'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('R'.$rowCount,'PO Nett USD');
				$worksheet->getStyle('R'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('S'.$rowCount,'Remarks');
				$worksheet->getStyle('S'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('T'.$rowCount,'Update By');
				$worksheet->getStyle('T'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('U'.$rowCount,'Update Date');
				$worksheet->getStyle('U'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('V'.$rowCount,'File Name');
				$worksheet->getStyle('V'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('W'.$rowCount,'Status');
				$worksheet->getStyle('W'.$rowCount)->applyFromArray($headerStyle);

				
				foreach($data as $k => $v){
					$rowCount++;
					$worksheet->SetCellValue('A'.$rowCount, $v['id']);
					$worksheet->SetCellValue('B'.$rowCount, $v['po_no']);
					$worksheet->SetCellValue('C'.$rowCount, $v['phase_code']);
					$worksheet->SetCellValue('D'.$rowCount, $v['phase_name']);
					$worksheet->SetCellValue('E'.$rowCount, $v['phase_year']);
					$worksheet->SetCellValue('F'.$rowCount, $v['po_type']);
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
			case "siteinfo":
				$filename = "export-data-siteinfo";
				$objPHPExcel = $objReader->load("__repository/template_export/template-export-siteinfo.xlsx");
				$worksheet = $objPHPExcel->setActiveSheetIndex(0);
				$rowCount = 9;
				$headerStyle = array(
					'fill' => array(
							'type' => PHPExcel_Style_Fill::FILL_SOLID,
							'color' => array('rgb'=>'BFBFBF'),
					),
					'font' => array(
							'bold' => true,
					)
				);
				
				$worksheet->SetCellValue('A'.$rowCount,'ID');
				$worksheet->getStyle('A'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('B'.$rowCount,'BOQ NO');
				$worksheet->getStyle('B'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('C'.$rowCount,'Site ID');
				$worksheet->getStyle('C'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('D'.$rowCount,'Site Name');
				$worksheet->getStyle('D'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('E'.$rowCount,'SOW Category');
				$worksheet->getStyle('E'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('F'.$rowCount,'Site Status');
				$worksheet->getStyle('F'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('G'.$rowCount,'Region Code');
				$worksheet->getStyle('G'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('H'.$rowCount,'Area Name');
				$worksheet->getStyle('H'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('I'.$rowCount,'Cluster');
				$worksheet->getStyle('I'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('J'.$rowCount,'Phase Code');
				$worksheet->getStyle('J'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('K'.$rowCount,'Phase Name');
				$worksheet->getStyle('K'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('L'.$rowCount,'SOW Detail');
				$worksheet->getStyle('L'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('M'.$rowCount,'System Key');
				$worksheet->getStyle('M'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('N'.$rowCount,'Site Ori');
				$worksheet->getStyle('N'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('O'.$rowCount,'Site Name Ori');
				$worksheet->getStyle('O'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('P'.$rowCount,'NE Name');
				$worksheet->getStyle('P'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('Q'.$rowCount,'Network BOQ');
				$worksheet->getStyle('Q'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('R'.$rowCount,'WP ID SVC');
				$worksheet->getStyle('R'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('S'.$rowCount,'SO SVC');
				$worksheet->getStyle('S'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('T'.$rowCount,'Partner NI');
				$worksheet->getStyle('T'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('U'.$rowCount,'Partner NPO');
				$worksheet->getStyle('U'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('V'.$rowCount,'Remarks');
				$worksheet->getStyle('V'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('W'.$rowCount,'Update By');
				$worksheet->getStyle('W'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('X'.$rowCount,'Update Date');
				$worksheet->getStyle('X'.$rowCount)->applyFromArray($headerStyle);
				$worksheet->SetCellValue('Y'.$rowCount,'Status');
				$worksheet->getStyle('Y'.$rowCount)->applyFromArray($headerStyle);

				foreach($data as $k => $v){
					$rowCount++;
					$worksheet->SetCellValue('A'.$rowCount, $v['id']);
					$worksheet->SetCellValue('B'.$rowCount, $v['boq_no']);
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
					$worksheet->SetCellValue('Y'.$rowCount, $v['status']);
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
	
	function simpandata($p1="",$p2=""){
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
		
		echo $this->mbackend->simpandata($p1, $post, $editstatus);
	}
	
	function importdata($p1=""){
		$p1 = $this->input->post('typeimport');
		$import = $this->mbackend->importdata($p1);
		
		if($import == 1){
			echo $import;
		}else{
			
			
			$this->nsmarty->assign('type', $p1);
			$this->nsmarty->assign('data', $import);
			$this->nsmarty->display("backend/modul/progress/hasil_import.html");
			
			/*
			echo "<pre>";
			print_r($import);
			//*/
		}
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
				$sql = "Alter table ".$k." auto_increment = 100000";
				$this->db->query($sql);
			}
		}
	}
	
	function test(){
		print_r($this->auth);
	}
	
}
