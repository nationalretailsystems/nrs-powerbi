CREATE OR REPLACE TABLE @LIBRARY@.USERS (
    clientId varchar(36) not null,
    clientSecret varchar(72) not null,
    scope varchar(360),
    primary key (clientId)
);

INSERT INTO @LIBRARY@.USERS
    (clientId, clientSecret, scope)
    VALUES ('eradani', '$2a$10$.XV0Go5VKuyL/FGy/DqL2.V/mG55BCNaUnkus0pV.fVyyrDLfaZTC', 'sample_scope');
