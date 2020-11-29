(princ "\n程序：统计线段长度 命令：zz")
(defun C:zz (/ CURVE TLEN SS N SUMLEN)
(vl-load-com) (setq SUMLEN 0)
(setq SS (ssget '((0 . "CIRCLE,ELLIPSE,LINE,*POLYLINE,SPLINE,ARC"))))
(setq N 0)
(repeat (sslength SS)
(setq CURVE (vlax-ename->vla-object (ssname SS N)))
(setq TLEN (vlax-curve-getdistatparam CURVE (vlax-curve-getendparam CURVE)))
(setq SUMLEN (+ SUMLEN TLEN))
(setq N (1+ N))
)
(princ (strcat "\n共选择bai " (itoa (sslength SS)) " 条线段. 线段总长: " (rtos SUMLEN 2 3) " .")) (princ)
)