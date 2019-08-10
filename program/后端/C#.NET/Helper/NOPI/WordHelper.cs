using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NPOI.OpenXmlFormats.Wordprocessing;
using NPOI.XWPF.UserModel;

namespace ElectronicBill.Common.NOPI {
    public class WordHelper {
        public static void PageBreak (XWPFDocument doc) {
            XWPFParagraph p = doc.CreateParagraph ();
            //设置分页符
            var pageBreakRun = p.CreateRun ();
            pageBreakRun.AddBreak (BreakType.PAGE);
        }

        public static void Wrap (XWPFDocument doc) {

            doc.CreateParagraph ();
        }

        public static int AddAndFillRow (XWPFTable table, int index, string[] rows) {
            AddNewRow (table);
            FillRow (table, index, rows);
            return index + 1;
        }

        public static void AddAndFillRow (XWPFTable table, string[] rows) {
            var r = AddNewRow (table);
            FillRow (r, rows);
        }

        public static XWPFTableRow AddNewRow (XWPFTable table) {
            return table.CreateRow ();
        }

        public static void FillRow (XWPFTableRow r, string[] rows) {
            for (int i = 0; i < rows.Length; i++) {
                if (!string.IsNullOrEmpty (rows[i])) {
                    r.GetCell (i).SetText (rows[i]);
                }
            }
        }

        public static void FillRow (XWPFTable table, int index, string[] rows) {
            var r = table.GetRow (index);
            for (int i = 0; i < rows.Length; i++) {
                if (!string.IsNullOrEmpty (rows[i])) {
                    r.GetCell (i).SetText (rows[i]);
                }
            }
        }

        public static void SetColumns (XWPFTable table, int rowIndex, string[] columns, ulong width) {
            var row = table.GetRow (rowIndex);
            for (int i = 0; i < columns.Length; i++) {
                row.GetCell (i).SetText (columns[i]);
                table.SetColumnWidth (i, width);
            }
        }

        public static void Paragraph (XWPFDocument doc, string content, string fontFamily = "宋体", FontCharRange fcr = FontCharRange.None, int fontSize = 10) {
            var p = doc.CreateParagraph ();
            var runTitle = p.CreateRun ();
            runTitle.SetText (content);
            runTitle.FontSize = fontSize;
            runTitle.SetFontFamily (fontFamily, fcr); //设置雅黑字体
        }

        public static void AddFootNote (XWPFDocument doc, string text) {
            // XWPFDocument m_Docx = new XWPFDocument ();           
            // m_Docx.Document.body.sectPr = new CT_SectPr ();       
            // CT_SectPr m_SectPr = m_Docx.Document.body.sectPr;

            // 创建页脚          
            // CT_Ftr m_ftr = new CT_Ftr ();         
            // m_ftr.Items = new System.Collections.ArrayList ();         
            // CT_SdtBlock m_Sdt = new CT_SdtBlock ();           
            // CT_SdtPr m_SdtPr = m_Sdt.AddNewSdtPr ();       
            // CT_SdtDocPart m_SdtDocPartObj = m_SdtPr.AddNewDocPartObj ();
            // m_SdtDocPartObj.AddNewDocPartGallery ().val = "PageNumbers (Bottom of Page)";          
            // m_SdtDocPartObj.docPartUnique = new CT_OnOff ();       
            // CT_SdtContentBlock m_SdtContent = m_Sdt.AddNewSdtContent ();          
            // CT_P m_SdtContentP = m_SdtContent.AddNewP ();        
            // CT_PPr m_SdtContentPpPr =  m_SdtContentP.AddNewPPr ();       
            // m_SdtContentPpPr.AddNewJc ().val = ST_Jc.center;        
            // m_SdtContentP.Items = new System.Collections.ArrayList ();           
            // CT_SimpleField m_fldSimple = new CT_SimpleField ();        
            // m_fldSimple.instr = " PAGE   \\*MERGEFORMAT ";           
            // m_SdtContentP.Items.Add (m_fldSimple);           
            // m_ftr.Items.Add (m_Sdt);
            
            doc.Document.body.sectPr = new CT_SectPr ();
            CT_SectPr m_SectPr = doc.Document.body.sectPr;

            //创建页脚
            CT_Ftr m_ftr = new CT_Ftr ();
            m_ftr.Items = new System.Collections.ArrayList ();    
            CT_SdtBlock m_Sdt = new CT_SdtBlock ();           
            CT_SdtPr m_SdtPr = m_Sdt.AddNewSdtPr ();       
            CT_SdtDocPart m_SdtDocPartObj = m_SdtPr.AddNewDocPartObj ();
            m_SdtDocPartObj.AddNewDocPartGallery ().val = "PageNumbers (Bottom of Page)";         
            m_SdtDocPartObj.docPartUnique = new CT_OnOff ();      
            CT_SdtContentBlock m_SdtContent = m_Sdt.AddNewSdtContent ();          
            CT_P m_SdtContentP = m_SdtContent.AddNewP ();        
            CT_PPr m_SdtContentPpPr =  m_SdtContentP.AddNewPPr ();       
            m_SdtContentPpPr.AddNewJc ().val = ST_Jc.right;        
            m_SdtContentP.Items = new System.Collections.ArrayList ();           
            CT_SimpleField m_fldSimple = new CT_SimpleField ();        
            m_fldSimple.instr = "PAGE   \\*MERGEFORMAT ";           
            m_SdtContentP.Items.Add (m_fldSimple); 
            m_ftr.Items.Add (m_Sdt);

            m_ftr.AddNewP().AddNewR().AddNewT().Value = text;

            //创建页脚关系（footern.xml）
            XWPFRelation Frelation = XWPFRelation.FOOTER;
            XWPFFooter m_f = (XWPFFooter) doc.CreateRelationship (Frelation, XWPFFactory.GetInstance (), doc.FooterList.Count + 1);

            //设置页脚
            m_f.SetHeaderFooter (m_ftr);
            CT_HdrFtrRef m_HdrFtr1 = m_SectPr.AddNewFooterReference ();
            m_HdrFtr1.type = ST_HdrFtr.@default;
            m_HdrFtr1.id = m_f.GetPackageRelationship().Id;
        }

        public static void AddHeaderNote (XWPFDocument doc) {

            CT_SectPr m_SectPr = doc.Document.body.sectPr;

            //创建页眉
            CT_Hdr m_Hdr = new CT_Hdr ();
            // m_Hdr.AddNewP().AddNewR().AddNewT().Value = "im yemei";//页眉内容
            //创建页眉关系（headern.xml）
            XWPFRelation Hrelation = XWPFRelation.HEADER;
            XWPFHeader m_h = (XWPFHeader) doc.CreateRelationship (Hrelation, XWPFFactory.GetInstance (), doc.HeaderList.Count);

            //设置页眉
            m_h.SetHeaderFooter (m_Hdr);
            CT_HdrFtrRef m_HdrFtr2 = m_SectPr.AddNewHeaderReference ();
            m_HdrFtr2.type = ST_HdrFtr.@default;
            m_HdrFtr2.id = m_h.GetPackageRelationship ().Id;

            doc.Document.body.sectPr = new CT_SectPr ();
            m_SectPr = doc.Document.body.sectPr;

            // Add the picture + relationship
            FileStream pictureData = null;
            pictureData = new FileStream ("../../image/3.jpeg", FileMode.Open, FileAccess.Read);

            //设置页眉
            m_h.SetHeaderFooter (m_Hdr);
            // m_h.AddPictureData (pictureData, (int) PictureType.JPEG, "3.jpeg", 7000000, 1000000);
            CT_HdrFtrRef m_HdrFtr = m_SectPr.AddNewHeaderReference ();
            m_HdrFtr.type = ST_HdrFtr.@default;
            m_HdrFtr.id = m_h.GetPackageRelationship ().Id;
        }

        public static Dictionary<string, List<DataRow>> SortDataViaKey (DataTable dt, string key) {
            Dictionary<string, List<DataRow>> dic = new Dictionary<string, List<DataRow>> ();
            foreach (DataRow r in dt.Rows) {
                if (dic.ContainsKey (r[key].ToString ())) {
                    dic[r[key].ToString ()].Add (r);
                } else {
                    dic.Add (r[key].ToString (), new List<DataRow> ());
                    dic[r[key].ToString ()].Add (r);
                }
            }
            return dic;
        }
    }
}