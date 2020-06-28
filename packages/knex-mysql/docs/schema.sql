create table `block`
(
    `id`                 int,
    `height`             int comment 'The block height',
    `exec_height`        int           not null comment 'The executed block height',
    `block_hash`         varchar(66)   NOT NULL UNIQUE comment 'The block hash',
    `order_root`         varchar(66)   NOT NULL comment 'Merkle root of ordered transactions',
    `prev_hash`          varchar(66)   NOT NULL comment 'Prev block hash',
    `proof_bitmap`       text          not null comment 'Proofed bitmap',
    `proof_round`        varchar(18)   NOT NULL comment 'Round usage',
    `proof_signature`    varchar(2050) NOT NULL comment 'Aggregated signature of validator set',
    `proposer`           varchar(42)   NOT NULL comment 'Address of the proposer',
    `state_root`         varchar(66)   NOT NULL comment 'State merkle root of the block',
    `timestamp`          varchar(18)   NOT NULL comment 'Block timestamp',
    `transactions_count` int           not null comment 'Number of transactions in the block',
    `validator_version`  varchar(18)   NOT NULL comment 'When the attributes of the validator set or the validator set change, the validatorVersion will change together'
);
alter table `block`
    add primary key `block_pkey` (`id`);
alter table `block`
    add unique `uniq_block_height` (`height`);
create table `transaction`
(
    `id`           bigint unsigned not null auto_increment primary key,
    `block`        int             not null comment 'The block height',
    `chain_id`     varchar(66)     NOT NULL,
    `cycles_limit` varchar(18)     NOT NULL,
    `cycles_price` varchar(18)     NOT NULL,
    `from`         varchar(42)     NOT NULL,
    `method`       varchar(255)    NOT NULL,
    `nonce`        varchar(66)     NOT NULL,
    `order`        bigint unsigned not null auto_increment primary key,
    `payload`      LONGTEXT        NOT NULL,
    `pubkey`       varchar(552)    NOT NULL comment 'Signature public keys, it is an RPL-encoded array of public keys, up to 8 public keys in a transaction',
    `service_name` varchar(1024)   NOT NULL,
    `signature`    varchar(1128)   NOT NULL comment 'it is an RPL-encoded array of Secp256k1 signature, up to 8 signatures in a transaction',
    `timeout`      varchar(18)     NOT NULL,
    `tx_hash`      varchar(66)     NOT NULL
);
alter table `transaction`
    add index `idx_transaction_block` (`block`);
alter table `transaction`
    add unique `uniq_transaction_tx_hash` (`tx_hash`);
create table `receipt`
(
    `id`          bigint unsigned not null auto_increment primary key,
    `block`       int             not null,
    `cycles_used` varchar(18)     NOT NULL,
    `is_error`    boolean         not null,
    `ret`         text            not null,
    `tx_hash`     varchar(66)     NOT NULL
);
alter table `receipt`
    add unique `uniq_receipt_tx_hash` (`tx_hash`);
create table `event`
(
    `id`      bigint unsigned not null auto_increment primary key,
    `data`    text            not null,
    `tx_hash` varchar(66)     NOT NULL,
    `service` varchar(255)    NOT NULL
);
alter table `event`
    add index `idx_event_tx_hash` (`tx_hash`);
create table `block_validator`
(
    `id`             int unsigned not null auto_increment primary key,
    `address`        varchar(42)  NOT NULL,
    `propose_weight` int          not null,
    `version`        varchar(18)  NOT NULL comment 'This field will change when the validator changes',
    `vote_weight`    int          not null
);
alter table `block_validator`
    add unique `uniq_block_validator_address_version` (`address`, `version`);
create table `account`
(
    `id`      bigint unsigned not null auto_increment primary key,
    `address` varchar(42)     NOT NULL
);
alter table `account`
    add unique `uniq_account_address` (`address`)