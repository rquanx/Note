using NPOI.SS.UserModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ServiceMe.Apps.API.Common.Tools.NPOI
{
    public class Cell
    {
        public ICellStyle CellStyle { get; set; }

        private Cell(IWorkbook wb)
        {
            CellStyle = wb.CreateCellStyle();
        }

        /// <summary>
        /// 创建style实例
        /// </summary>
        /// <param name="wb"></param>
        /// <returns></returns>
        public static Cell Create(IWorkbook wb)
        {
            return new Cell(wb);
        }

        /// <summary>
        /// 设置文本旋转角度-90 - 90
        /// </summary>
        /// <param name="rotation"></param>
        /// <returns></returns>
        public Cell Rotation(short rotation)
        {
            CellStyle.Rotation = rotation;
            return this;
        }

        /// <summary>
        /// 设置背景色
        /// </summary>
        /// <param name="color"></param>
        /// <returns></returns>
        public Cell BackgroundColor( short color)
        {
            CellStyle.FillForegroundColor = color;
            CellStyle.FillPattern = FillPattern.SolidForeground;
            return this;
        }

        /// <summary>
        ///  设置水平对齐方式
        /// </summary>
        /// <param name="alignment"></param>
        /// <returns></returns>
        public Cell Alignment( HorizontalAlignment alignment)
        {
            CellStyle.Alignment = alignment;
            return this;
        }

        /// <summary>
        /// 设置垂直对齐方式
        /// </summary>
        /// <param name="alignment"></param>
        /// <returns></returns>
        public Cell VerticalAlignment(VerticalAlignment alignment)
        {
            CellStyle.VerticalAlignment = alignment;
            return this;
        }

        /// <summary>
        /// 设置自动换行
        /// </summary>
        /// <param name="warp"></param>
        /// <returns></returns>
        public Cell WarpText(bool warp)
        {
            CellStyle.WrapText = warp;
            return this;
        }

        /// <summary>
        /// 设置全部框线
        /// </summary>
        /// <returns></returns>

        public Cell Border()
        {
            CellStyle.BorderBottom = BorderStyle.Thin;
            CellStyle.BorderLeft = BorderStyle.Thin;
            CellStyle.BorderRight = BorderStyle.Thin;
            CellStyle.BorderTop = BorderStyle.Thin;
            return this;
        }

        /// <summary>
        /// 设置边框线
        /// </summary>
        /// <param name="top"></param>
        /// <param name="bottom"></param>
        /// <param name="left"></param>
        /// <param name="right"></param>
        /// <returns></returns>
        public Cell Border(BorderStyle top = BorderStyle.None,BorderStyle bottom = BorderStyle.None, BorderStyle left = BorderStyle.None, BorderStyle right = BorderStyle.None)
        {
            CellStyle.BorderBottom = bottom;
            CellStyle.BorderLeft = left;
            CellStyle.BorderRight = right;
            CellStyle.BorderTop = top;
            return this;
        }


        /// <summary>
        /// 设置字体
        /// </summary>
        /// <param name="font"></param>
        /// <returns></returns>
        public Cell Font(IFont font)
        {
            
            CellStyle.SetFont(font);
            return this; 
        }
    }
}