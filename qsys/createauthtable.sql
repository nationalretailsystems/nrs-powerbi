CREATE OR REPLACE TABLE ECIDEV.USERS (
    clientId varchar(36) not null,
    clientSecret varchar(72) not null,
    scope varchar(360),
    primary key (clientId)
)
