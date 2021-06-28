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
     DCharBuf          S            500A   Based(BufPtr)

      ************************************
      * Convert Location to buffer
      ************************************
     PLocationToBuf    B                   Export

     DLocationToBuf    PI
     DDataStruct                           LikeDS(Location)
     D                                     Const
     DBuffer                        500A

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
     DBuffer                        500A
     DDataStruct                           LikeDS(Weather)

       // Initialize to begining of buffer
       BufPtr = %addr(Buffer);

       // Read fields from buffer into DS
       // Nested data structs are not yet implemented;
       DataStruct.Forecasts;

       return ;

     PBufToWeather     E
