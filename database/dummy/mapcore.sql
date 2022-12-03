CALL save_question('MAPCORE-001','MAPcore & GPEC Service Request Form','heading', 0, false);
CALL save_question('MAPCORE-002','Request Type','multi', 1, true);
CALL save_question('MAPCORE-003','Contact Details','contact', 2, true);
CALL save_question('MAPCORE-004','Study Title','text', 3, true);
CALL save_question('MAPCORE-005','Microtomy','heading', 4, false);
CALL save_question('MAPCORE-006','Microtomy (FFPE Only)','multi', 5, false);
CALL save_question('MAPCORE-007','Histochemistry','heading', 6, false);
CALL save_question('MAPCORE-008','Routine Staining','multi', 7, false);
CALL save_question('MAPCORE-009','Singleplex IHC','multi', 8, false);
CALL save_question('MAPCORE-010','Multiplex IHC','multi', 9, false);
CALL save_question('MAPCORE-011','In Situ Hybridization','multi', 10, false);
CALL save_question('MAPCORE-012','NanoString GeoMx Digital Spacial Profiler','multi', 11, false);
CALL save_question('MAPCORE-013','Imaging and Analysis','heading', 12, false);
CALL save_question('MAPCORE-014','Slide Scanning','multi', 13, false);
CALL save_question('MAPCORE-015','Scoring and Analysis','multi', 14, false);
CALL save_question('MAPCORE-016','Tissue Type','multi', 15, false);
CALL save_question('MAPCORE-017','Relevant Tissue Details','text', 16, false);
CALL save_question('MAPCORE-018','Number of Blocks/Slides','text', 17, false);
CALL save_question('MAPCORE-019','Coring Details','heading', 18, false);
CALL save_question('MAPCORE-020','Cores Size','multi', 19, false);
CALL save_question('MAPCORE-021','Number of Cores Per Block','multi', 20, false);
CALL save_question('MAPCORE-022','Comments','text', 21, false);
CALL save_question('MAPCORE-023','Detailed Service Request Form Template','download', 22, false);
CALL save_question('MAPCORE-024','Relevant File Upload','upload', 23, false);

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