using NPOI.HSSF.Util;
using NPOI.SS.UserModel;
using NPOI.SS.Util;
using ServiceMe.Apps.API.Common.Model;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace ServiceMe.Apps.API.Common.Tools.NPOI
{
    public class ExcelHelper
    {
        /// <summary>
        /// 合并单元格
        /// </summary>
        /// <param name="sheet"></param>
        /// <param name="startRow"></param>
        /// <param name="endRow"></param>
        /// <param name="startCell"></param>
        /// <param name="endCell"></param>
        public static void MergeCell(ISheet sheet, int startRow, int endRow, int startCell, int endCell)
        {
            if (startRow == endRow && startCell == endCell)
            {
                return;
            }
            sheet.AddMergedRegion(new CellRangeAddress(startRow, endRow, startCell, endCell));
        }

        /// <summary>
        /// 设置行高，高度值，拖拽Excel行时显示的高度值
        /// </summary>
        /// <param name="sheet"></param>
        /// <param name="row"></param>
        /// <param name="height"></param>
        public static void SetRowHeight(ISheet sheet, int row, short height)
        {
            sheet.GetRow(row).Height = (short)(height * 20);

        }

        /// <summary>
        /// 设置列宽，px 为像素值，拖拽Excel行时显示的像素值
        /// </summary>
        /// <param name="sheet"></param>
        /// <param name="column"></param>
        /// <param name="px"></param>
        public static void SetColumnWidth(ISheet sheet, int column, int px)
        {
            sheet.SetColumnWidth(column, px * 256);
        }

        /// <summary>
        /// 保存excel到data文件夹下
        /// </summary>
        /// <param name="wb"></param>
        /// <param name="name"></param>
        /// <param name="type"></param>
        public static void SaveFile(IWorkbook wb, string name, string type = "xlsx")
        {
            var fileName = name + DateTime.Now.ToString("yyyyMMddHHmmss") + "." + type;
            string dataPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"Data");

            if (!Directory.Exists(dataPath))
            {
                Directory.CreateDirectory(dataPath);
            }
            var strPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"Data\" + fileName);
            using (FileStream fs = new FileStream(strPath, FileMode.Create))
            {
                wb.Write(fs);
                using (MemoryStream ms = new MemoryStream())
                {
                    wb.Write(ms);
                }
            }
        }

        /// <summary>
        /// 读取列，不存在会创建
        /// </summary>
        /// <param name="sheet"></param>
        /// <param name="row"></param>
        /// <returns></returns>
        public static IRow GetRow(ISheet sheet, int row)
        {
            var r = sheet.GetRow(row);
            return r == null ? sheet.CreateRow(row) : r;
        }

        /// <summary>
        /// 读取单元格，不存在会创建
        /// </summary>
        /// <param name="r"></param>
        /// <param name="column"></param>
        /// <returns></returns>
        public static ICell GetCell(IRow r, int column)
        {
            var c = r.GetCell(column);
            return c == null ? r.CreateCell(column) : c;
        }

        /// <summary>
        /// 根据row和column写入单元格,row/cell不存在均会创建
        /// </summary>
        /// <param name="sheet"></param>
        /// <param name="row"></param>
        /// <param name="column"></param>
        /// <param name="value"></param>
        /// <param name="cellStyle"></param>
        public static void WriteCell(ISheet sheet, int row, int column, string value, ICellStyle cellStyle = null)
        {
            var r = GetRow(sheet, row);
            WriteCell(r, column, value, cellStyle);
        }

        /// <summary>
        /// 向已有的列中写入第column列的单元格，单元格不存在会自动创建单元格
        /// </summary>
        /// <param name="row"></param>
        /// <param name="column"></param>
        /// <param name="value"></param>
        /// <param name="cellStyle"></param>
        public static void WriteCell(IRow row, int column, string value, ICellStyle cellStyle = null)
        {
            var c = GetCell(row, column);
            WriteCell(c, value, cellStyle);
        }

        /// <summary>
        /// 将值和style写入单元格
        /// </summary>
        /// <param name="cell"></param>
        /// <param name="value"></param>
        /// <param name="cellStyle"></param>
        public static void WriteCell(ICell cell, string value, ICellStyle cellStyle = null)
        {
            cell.SetCellValue(value);
            if (cellStyle != null)
            {
                cell.CellStyle = cellStyle;
            }
        }


        /// <summary>
        /// 传入当前的行和列，查找下一行的元素
        /// </summary>
        /// <param name="sheet"></param>
        /// <param name="rowIndex"></param>
        /// <param name="columnIndex"></param>
        /// <returns></returns>
        public static RowModal GetNextRow(ISheet sheet, int rowIndex, int columnIndex)
        {
            return GetRow(sheet, rowIndex, columnIndex);
        }

        /// <summary>
        /// 传入当前的行和列，查找值不相等且不属于被合并的下一行
        /// </summary>
        /// <param name="sheet"></param>
        /// <param name="rowIndex"></param>
        /// <param name="columnIndex"></param>
        /// <returns></returns>
        public static RowModal GetNextRowValue(ISheet sheet, int rowIndex, int columnIndex, string prev)
        {
            return GetRow(sheet, rowIndex, columnIndex, true, prev);
        }

        /// <summary>
        /// 读取下一列
        /// </summary>
        /// <param name="row"></param>
        /// <param name="index"></param>
        /// <returns></returns>
        public static CellModal GetNextColumn(IRow row, int index)
        {
            return GetColumn(row, index);
        }

        /// <summary>
        /// 传入当前的行和列，查找值不为空且 != prev 且不属于被合并的下一列
        /// </summary>
        /// <param name="row"></param>
        /// <param name="index"></param>
        /// <param name="prev"></param>
        /// <returns></returns>
        public static CellModal GetNextColumnValue(IRow row, int index, string prev)
        {
            return GetColumn(row, index, true, prev);
        }

        private static RowModal GetRow(ISheet sheet, int rowIndex, int columnIndex, bool value = false, string prev = "")
        {
            rowIndex++;
            while (sheet.GetRow(rowIndex) != null)
            {
                if (value)
                {
                    var cell = sheet.GetRow(rowIndex).GetCell(columnIndex);
                    if (cell == null)
                    {
                        return null;
                    }
                    if (!IsEmpty(cell) && 
                        ((!IsMerged(cell) && !IsEqualPrev(cell, prev)) ||
                        (IsMerged(cell) && !IsEqualPrev(cell, prev))))
                    {
                        return new RowModal() { Row = sheet.GetRow(rowIndex), Index = rowIndex };
                    }
                }
                else
                {
                    return new RowModal() { Row = sheet.GetRow(rowIndex), Index = rowIndex };
                }
                rowIndex++;
            }
            return null;
        }

        private static CellModal GetColumn(IRow row, int index, bool value = false, string prev = "")
        {
            index++;
            while (row.GetCell(index) != null)
            {
                if (value)
                {
                    ICell cell = row.GetCell(index);
                    if (!IsEmpty(cell) &&
                        ((!IsMerged(cell) && !IsEqualPrev(cell, prev)) ||
                        (IsMerged(cell) && !IsEqualPrev(cell, prev))))
                    {
                        return new CellModal() { Cell = cell, Index = index, Value = GetCellValue(cell) };
                    }
                }
                else
                {
                    ICell cell = row.GetCell(index);
                    return new CellModal() { Cell = cell, Index = index, Value = GetCellValue(cell) };
                }

                index++;
            }
            return null;
        }

        /// <summary>
        /// 返回是否不为合并
        /// </summary>
        /// <param name="cell"></param>
        /// <returns></returns>
        private static bool IsMerged(ICell cell)
        {
            return cell.IsMergedCell;
        }

        /// <summary>
        /// 返回是否不为空
        /// </summary>
        /// <param name="cell"></param>
        /// <returns></returns>
        private static bool IsEmpty(ICell cell)
        {
            return string.IsNullOrEmpty(GetCellValue(cell));
        }

        private static bool IsEqualPrev(ICell cell, string prev)
        {
            return cell.ToString() == prev;
        }

        /// <summary>
        /// 向已有row中读取单元格的值
        /// </summary>
        /// <param name="row"></param>
        /// <param name="column"></param>
        /// <returns></returns>
        public static string GetCellValue(IRow row, int column)
        {
            return row.GetCell(column) == null ? "" : GetCellValue(row.GetCell(column));
        }

        /// <summary>
        /// 读取单元格的值，会进行trim
        /// </summary>
        /// <param name="cell"></param>
        /// <returns></returns>
        private static string GetCellValue(ICell cell)
        {
            return cell == null ? "" : cell.ToString().Trim();
        }

        /// <summary>
        /// 根据row和column读取单元格值，会进行trim
        /// </summary>
        /// <param name="sheet"></param>
        /// <param name="rowIndex"></param>
        /// <param name="columnIndex"></param>
        /// <returns></returns>
        public static string GetCellValue(ISheet sheet, int rowIndex, int columnIndex)
        {
            return GetCellValue(sheet.GetRow(rowIndex), columnIndex);
        }
    }
}