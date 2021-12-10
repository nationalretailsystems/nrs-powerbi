     H Nomain

      ************************************
      * Module: wthfrcapi
      * Generated RPG conversion procedures
      * Do not modify
      ************************************

      /include wthfcapi_h

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
      * Convert Location to buffer
      ************************************
     PLocationToBuf    B                   Export

     DLocationToBuf    PI
     DDataStruct                           LikeDS(Location)
     D                                     Const
     DBuffer                         22A

       // Initialize to beginning of buffer
       BufPtr = %addr(Buffer);

       // Write fields from DS to buffer
       %subst(CharBuf:1:11) = %char(DataStruct.Lat);
       BufPtr += 11;
       %subst(CharBuf:1:11) = %char(DataStruct.Lon);
       BufPtr += 11;

       return ;

     PLocationToBuf    E

      ************************************
      * Convert buffer to Weather
      ************************************
     PBufToWeather     B                   Export

     DBufToWeather     PI
     DBuffer                        656A
     DDataStruct                           LikeDS(Weather)

       // Initialize to begining of buffer
       BufPtr = %addr(Buffer);

       // Read fields from buffer into DS
       for i = 1 to 8;
       DataStruct.Forecasts(i).Date = %date(%subst(CharBuf:1:10):*ISO);
       BufPtr += 10;
       DataStruct.Forecasts(i).Min = %dec(%subst(CharBuf:1:7):5:2);
       BufPtr += 7;
       DataStruct.Forecasts(i).Max = %dec(%subst(CharBuf:1:7):5:2);
       BufPtr += 7;
       DataStruct.Forecasts(i).Desc = %subst(CharBuf:1:58);
       BufPtr += 58;
       endfor;

       return ;

     PBufToWeather     E
