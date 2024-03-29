CALL save_form('MAPCORE-FORM-1', 'Mapcore Consultation Request');

CALL save_question('MAPCORE-001','MAPCORE-FORM-1','MAPcore & GPEC Service Request Form','heading', 0, false, false);
CALL save_question('MAPCORE-002','MAPCORE-FORM-1','Request Type','multi', 1, true, false);
CALL save_question('MAPCORE-003','MAPCORE-FORM-1','Contact Details','contact', 2, true, false);
CALL save_question('MAPCORE-004','MAPCORE-FORM-1','Study Title','text', 3, true, false);
CALL save_question('MAPCORE-005','MAPCORE-FORM-1','Microtomy','heading', 4, false, false);
CALL save_question('MAPCORE-006','MAPCORE-FORM-1','Microtomy (FFPE Only)','multi', 5, false, false);
CALL save_question('MAPCORE-007','MAPCORE-FORM-1','Histochemistry','heading', 6, false, false);
CALL save_question('MAPCORE-008','MAPCORE-FORM-1','Routine Staining','multi', 7, false, false);
CALL save_question('MAPCORE-009','MAPCORE-FORM-1','Singleplex IHC','multi', 8, false, false);
CALL save_question('MAPCORE-010','MAPCORE-FORM-1','Multiplex IHC','multi', 9, false, false);
CALL save_question('MAPCORE-011','MAPCORE-FORM-1','In Situ Hybridization','multi', 10, false, false);
CALL save_question('MAPCORE-012','MAPCORE-FORM-1','NanoString GeoMx Digital Spacial Profiler','multi', 11, false, false);
CALL save_question('MAPCORE-013','MAPCORE-FORM-1','Imaging and Analysis','heading', 12, false, false);
CALL save_question('MAPCORE-014','MAPCORE-FORM-1','Slide Scanning','multi', 13, false, false);
CALL save_question('MAPCORE-015','MAPCORE-FORM-1','Scoring and Analysis','multi', 14, false, false);
CALL save_question('MAPCORE-016','MAPCORE-FORM-1','Tissue Type','multi', 15, false, false);
CALL save_question('MAPCORE-017','MAPCORE-FORM-1','Relevant Tissue Details','text', 16, false, false);
CALL save_question('MAPCORE-018','MAPCORE-FORM-1','Number of Blocks/Slides','text', 17, false, false);
CALL save_question('MAPCORE-019','MAPCORE-FORM-1','Coring Details','heading', 18, false, false);
CALL save_question('MAPCORE-020','MAPCORE-FORM-1','Cores Size','multi', 19, false, false);
CALL save_question('MAPCORE-021','MAPCORE-FORM-1','Number of Cores Per Block','multi', 20, false, false);
CALL save_question('MAPCORE-022','MAPCORE-FORM-1','Comments','text', 21, false, false);
CALL save_question('MAPCORE-023','MAPCORE-FORM-1','Detailed Service Request Form Template','download', 22, false, false);
CALL save_question('MAPCORE-024','MAPCORE-FORM-1','Relevant File Upload','upload', 23, false, false);

CALL save_answer('MAPCORE-101','Consultation','multi', 'MAPCORE-002');
CALL save_answer('MAPCORE-102','Service','multi', 'MAPCORE-002');
CALL save_answer('MAPCORE-103','Clinical Service (Anatomical Pathology Departments)','multi', 'MAPCORE-002');
CALL save_answer('MAPCORE-104','Coring','multi', 'MAPCORE-006');
CALL save_answer('MAPCORE-105','Scrolling','multi', 'MAPCORE-006');
CALL save_answer('MAPCORE-106','Sectioning','multi', 'MAPCORE-006');
CALL save_answer('MAPCORE-107','TMA Construction','multi', 'MAPCORE-006');
CALL save_answer('MAPCORE-108','FFPE H&E','multi', 'MAPCORE-008');
CALL save_answer('MAPCORE-109','Optimization','multi', 'MAPCORE-009');
CALL save_answer('MAPCORE-110','Staining (Prevalidated)','multi', 'MAPCORE-009');
CALL save_answer('MAPCORE-111','Chromogenic Optimization','multi', 'MAPCORE-010');
CALL save_answer('MAPCORE-112','Chromogenic Staining (Prevalidated Panel)','multi', 'MAPCORE-010');
CALL save_answer('MAPCORE-113','Opal Optimization','multi', 'MAPCORE-010');
CALL save_answer('MAPCORE-114','Opal Staining (Prevalidated Panel)','multi', 'MAPCORE-010');
CALL save_answer('MAPCORE-115','miRNAscope','multi', 'MAPCORE-011');
CALL save_answer('MAPCORE-116','RNAscope','multi', 'MAPCORE-011');
CALL save_answer('MAPCORE-117','Custom Marker Optimization','multi', 'MAPCORE-012');
CALL save_answer('MAPCORE-118','Custom Panel Optimization','multi', 'MAPCORE-012');
CALL save_answer('MAPCORE-119','Digital Spacial Profiling (Prevalidated)','multi', 'MAPCORE-012');
CALL save_answer('MAPCORE-120','Leica Aperio AT2 Brightfield','multi', 'MAPCORE-014');
CALL save_answer('MAPCORE-121','ZEISS Axio Scan.Z1 Fluorescence','multi', 'MAPCORE-014');
CALL save_answer('MAPCORE-122','Research Pathologist Assessment','multi', 'MAPCORE-015');
CALL save_answer('MAPCORE-123','Indica Labs HALO','multi', 'MAPCORE-015');
CALL save_answer('MAPCORE-124','ZEISS ZEN Blue','multi', 'MAPCORE-015');
CALL save_answer('MAPCORE-125','Human','multi', 'MAPCORE-016');
CALL save_answer('MAPCORE-126','Murine','multi', 'MAPCORE-016');
CALL save_answer('MAPCORE-127','Xenograft','multi', 'MAPCORE-016');
CALL save_answer('MAPCORE-128','0.6mm','multi', 'MAPCORE-020');
CALL save_answer('MAPCORE-129','1.0mm','multi', 'MAPCORE-020');
CALL save_answer('MAPCORE-130','2.0mm','multi', 'MAPCORE-020');
CALL save_answer('MAPCORE-131','1 core/block','multi', 'MAPCORE-021');
CALL save_answer('MAPCORE-132','2 cores/block','multi', 'MAPCORE-021');