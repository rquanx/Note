using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xceed.Words.NET;
using System.Data;
namespace ElectronicBill.Common.Docx
{
    public class DocXHelper
    {
        public static DocX Create()
        {
            MemoryStream stream = new MemoryStream();
            DocX cx = DocX.Create(stream);
            return cx;
        }

        public static DocX Create(MemoryStream stream)
        {
            DocX cx = DocX.Create(stream);
            return cx;
        }

        public static void SetColumns(Table table,int index,string [] columns,int fontSize = 10)
        {
            for(int i = 0; i < columns.Length;i++)
            {
                table.Rows[0].Cells[i].Paragraphs[0].Append(columns[i]).FontSize(fontSize).Font("宋体").Alignment = Alignment.center;
            }
        }

        public static Dictionary<string, List<DataRow>> SortDataViaKey(DataTable dt, string key)
        {
            Dictionary<string, List<DataRow>> dic = new Dictionary<string, List<DataRow>>();
            foreach (DataRow r in dt.Rows)
            {
                if (dic.ContainsKey(r[key].ToString()))
                {
                    dic[r[key].ToString()].Add(r);
                }
                else
                {
                    dic.Add(r[key].ToString(), new List<DataRow>());
                    dic[r[key].ToString()].Add(r);
                }
            }
            return dic;
        }

        public static int AddAndFillRow(Table table, int index, string[] rows, Alignment[] aligns = null)
        {
            AddNewRow(table);
            FillRow(table, index, rows, aligns);
            return index + 1;
        }

        public static void AddAndFillRow(Table table, string[] rows, Alignment[] aligns = null)
        {
            var r = AddNewRow(table);
            FillRow(r, rows, aligns);
        }

        public static Row AddNewRow(Table table)
        {
            return table.InsertRow();
        }

        public static void FillRow(Row r, string[] rows, Alignment[] aligns = null, string fontFamyily = "宋体", int fontSize = 10)
        {
            for (int i = 0; i < rows.Length; i++)
            {
                if (!string.IsNullOrEmpty(rows[i]))
                {
                    SetCell(r, i, rows[i], aligns == null ? Alignment.both : aligns[i], fontFamyily, fontSize);
                }
            }
        }

        public static void FillRow(Table table, int index, string[] rows, Alignment[] aligns = null, string fontFamyily = "宋体", int fontSize = 10)
        {
            var r = table.Rows[index];
            for (int i = 0; i < rows.Length; i++)
            {
                if (!string.IsNullOrEmpty(rows[i]))
                {
                    SetCell(r, i, rows[i], aligns == null ? Alignment.both : aligns[i], fontFamyily,fontSize);
                }
            }
        }

        public static void SetCell(Row r, int index,string value, Alignment align = Alignment.both,string fontFamyily = "宋体", int fontSize = 10)
        {
            var p = r.Cells[index].Paragraphs[0].Append(value).Font(fontFamyily).FontSize(fontSize);
            if(align != Alignment.both)
            {
                p.Alignment = align;
            }

        }
    }
}
