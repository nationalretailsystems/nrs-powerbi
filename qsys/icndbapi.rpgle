     H Nomain

      ************************************
      * Module: icndbapi
      * Generated RPG conversion procedures
      * Do not modify
      ************************************

      /include icndbapi_h

      ************************************
      * Global variables
      ************************************
     DBufPtr           S               *
     DCharBuf          S          64512A   Based(BufPtr)
     Di                S             10U 0
     Dj                S             10U 0
     Dk                S             10U 0
     Dl                S             10U 0

      ************************************
      * Convert ReqData to buffer
      ************************************
     PReqDataToBuf     B                   Export

     DReqDataToBuf     PI
     DDataStruct                           LikeDS(ReqData)
     D                                     Const
     DBuffer                         15A

      * Initialize to beginning of buffer
       BufPtr = %addr(Buffer);

      * Write fields from DS to buffer
       %subst(CharBuf:1:15) = DataStruct.Category;
       BufPtr += 15;

       return ;

     PReqDataToBuf     E

      ************************************
      * Convert buffer to ResData
      ************************************
     PBufToResData     B                   Export

     DBufToResData     PI
     DBuffer                       1000A
     DDataStruct                           LikeDS(ResData)

      * Initialize to begining of buffer
       BufPtr = %addr(Buffer);

      * Read fields from buffer into DS
       DataStruct.Joke = %subst(CharBuf:1:1000);
       BufPtr += 1000;

       return ;

     PBufToResData     E
