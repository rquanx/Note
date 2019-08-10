using ICSharpCode.SharpZipLib.Checksum;
using ICSharpCode.SharpZipLib.Zip;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ElectronicBill.Common
{
    public class ZipHelper
    {

        private ZipOutputStream zipStream { get; set; }
        private MemoryStream Ms { get; set; }
        private Crc32 Crc { get; set; }


        public ZipHelper(int level = 6)
        {
            Ms = new MemoryStream();
            zipStream = new ZipOutputStream(Ms);
            Crc = new Crc32();
        }


        public ZipHelper(Stream stream, int level = 6)
        {

            zipStream = new ZipOutputStream(stream);
        }

        /// <summary>
        /// 压缩文件
        /// </summary>
        /// <param name="sourceFilePath"></param>
        /// <param name="destinationZipFilePath"></param>
        public ZipHelper Create()
        {
            return new ZipHelper();
        }

        public ZipHelper Add(MemoryStream stream, string fileName)
        {
            byte[] buffer = stream.ToArray();
            string tempFile = fileName;
            ZipEntry entry = new ZipEntry(tempFile);
            entry.DateTime = DateTime.Now;
            entry.Size = stream.Length;
            stream.Close();
            Crc.Reset();
            Crc.Update(buffer);
            entry.Crc = Crc.Value;
            zipStream.PutNextEntry(entry);
            zipStream.Write(buffer, 0, buffer.Length);
            return this;
        }

        public ZipHelper Add(MemoryStream[] streams, string[] fileNames)
        {
            for (int i = 0; i < streams.Length; i++)
            {
                MemoryStream stream = streams[i];
                string fileName = fileNames[i];
                byte[] buffer = stream.ToArray();
                string tempFile = fileName;
                ZipEntry entry = new ZipEntry(tempFile);
                entry.DateTime = DateTime.Now;
                entry.Size = stream.Length;
                stream.Close();
                Crc.Reset();
                Crc.Update(buffer);
                entry.Crc = Crc.Value;
                zipStream.PutNextEntry(entry);
                zipStream.Write(buffer, 0, buffer.Length);
            }
            return this;
        }

        public void Dispose()
        {
            Ms.Dispose();
            zipStream.Close();
        }

        public MemoryStream GetStream()
        {
            zipStream.Finish();
            return Ms;
        }

        /// <summary>
        /// 压缩文件
        /// </summary>
        /// <param name="sourceFilePath"></param>
        /// <param name="destinationZipFilePath"></param>
        public static void CreateZip(string sourceFilePath, string destinationZipFilePath)
        {
            if (sourceFilePath[sourceFilePath.Length - 1] != System.IO.Path.DirectorySeparatorChar)
                sourceFilePath += System.IO.Path.DirectorySeparatorChar;

            ZipOutputStream zipStream = new ZipOutputStream(File.Create(destinationZipFilePath));
            zipStream.SetLevel(6);  // 压缩级别 0-9
            CreateZipFiles(sourceFilePath, zipStream, sourceFilePath);

            zipStream.Finish();
            zipStream.Close();
        }


        /// <summary>
        /// 递归压缩文件
        /// </summary>
        /// <param name="sourceFilePath">待压缩的文件或文件夹路径</param>
        /// <param name="zipStream">打包结果的zip文件路径（类似 D:\WorkSpace\a.zip）,全路径包括文件名和.zip扩展名</param>
        /// <param name="staticFile"></param>
        private static void CreateZipFiles(string sourceFilePath, ZipOutputStream zipStream, string staticFile)
        {
            Crc32 crc = new Crc32();
            string[] filesArray = Directory.GetFileSystemEntries(sourceFilePath);
            foreach (string file in filesArray)
            {
                if (Directory.Exists(file))                     //如果当前是文件夹，递归
                {
                    CreateZipFiles(file, zipStream, staticFile);
                }

                else                                            //如果是文件，开始压缩
                {
                    FileStream fileStream = File.OpenRead(file);

                    byte[] buffer = new byte[fileStream.Length];
                    fileStream.Read(buffer, 0, buffer.Length);
                    string tempFile = file.Substring(staticFile.LastIndexOf("\\") + 1);
                    ZipEntry entry = new ZipEntry(tempFile);

                    entry.DateTime = DateTime.Now;
                    entry.Size = fileStream.Length;
                    fileStream.Close();
                    crc.Reset();
                    crc.Update(buffer);
                    entry.Crc = crc.Value;
                    zipStream.PutNextEntry(entry);
                    zipStream.Write(buffer, 0, buffer.Length);
                }
            }
        }
    }
}
