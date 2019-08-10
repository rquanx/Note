using NPOI.SS.UserModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace ServiceMe.Apps.API.Common.Tools.NPOI
{
    //重写Npoi流方法,wb.write可能会关闭文件
    public class NpoiMemoryStream : MemoryStream
    {
        public NpoiMemoryStream()
        {
            AllowClose = true;
        }

        public bool AllowClose { get; set; }

        public override void Close()
        {
            if (AllowClose)
                base.Close();
        }

        /// <summary>
        /// 将wb写入ms，不会关闭
        /// </summary>
        /// <param name="wb"></param>
        /// <param name="ms"></param>
        public static void Write(IWorkbook wb,NpoiMemoryStream ms)
        {
            ms.AllowClose = false;
            wb.Write(ms);
            ms.Flush();
            ms.Seek(0, SeekOrigin.Begin);
            ms.AllowClose = true;
        }
    }
}