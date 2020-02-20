# Schema Types

<details>
  <summary><strong>Table of Contents</strong></summary>

  * [Query](#query)
  * [Objects](#objects)
    * [Account](#account)
    * [Asset](#asset)
    * [AssetTransfer](#assettransfer)
    * [Balance](#balance)
    * [Block](#block)
    * [Event](#event)
    * [Transaction](#transaction)
    * [Validator](#validator)
  * [Inputs](#inputs)
    * [AccountOrderByInput](#accountorderbyinput)
    * [AccountWhereInput](#accountwhereinput)
    * [AccountWhereUniqueInput](#accountwhereuniqueinput)
    * [AssetFilter](#assetfilter)
    * [AssetOrderByInput](#assetorderbyinput)
    * [AssetTransferFilter](#assettransferfilter)
    * [AssetTransferOrderByInput](#assettransferorderbyinput)
    * [AssetTransferWhereInput](#assettransferwhereinput)
    * [AssetTransferWhereUniqueInput](#assettransferwhereuniqueinput)
    * [AssetWhereInput](#assetwhereinput)
    * [AssetWhereUniqueInput](#assetwhereuniqueinput)
    * [BalanceFilter](#balancefilter)
    * [BalanceOrderByInput](#balanceorderbyinput)
    * [BalanceWhereInput](#balancewhereinput)
    * [BlockFilter](#blockfilter)
    * [BlockOrderByInput](#blockorderbyinput)
    * [BlockWhereInput](#blockwhereinput)
    * [BlockWhereUniqueInput](#blockwhereuniqueinput)
    * [DateTimeFilter](#datetimefilter)
    * [EventFilter](#eventfilter)
    * [EventWhereInput](#eventwhereinput)
    * [IntFilter](#intfilter)
    * [NullableBooleanFilter](#nullablebooleanfilter)
    * [NullableStringFilter](#nullablestringfilter)
    * [StringFilter](#stringfilter)
    * [TransactionFilter](#transactionfilter)
    * [TransactionOrderByInput](#transactionorderbyinput)
    * [TransactionWhereInput](#transactionwhereinput)
    * [TransactionWhereUniqueInput](#transactionwhereuniqueinput)
    * [ValidatorFilter](#validatorfilter)
    * [ValidatorWhereInput](#validatorwhereinput)
    * [ValidatorWhereUniqueInput](#validatorwhereuniqueinput)
  * [Enums](#enums)
    * [OrderByArg](#orderbyarg)
  * [Scalars](#scalars)
    * [Address](#address)
    * [Boolean](#boolean)
    * [Bytes](#bytes)
    * [DateTime](#datetime)
    * [Hash](#hash)
    * [Int](#int)
    * [String](#string)
    * [Uint64](#uint64)

</details>

## Query
<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>account</strong></td>
<td valign="top"><a href="#account">Account</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">where</td>
<td valign="top"><a href="#accountwhereuniqueinput">AccountWhereUniqueInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>accounts</strong></td>
<td valign="top">[<a href="#account">Account</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">after</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">before</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">last</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">orderBy</td>
<td valign="top"><a href="#accountorderbyinput">AccountOrderByInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">skip</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">where</td>
<td valign="top"><a href="#accountwhereinput">AccountWhereInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>asset</strong></td>
<td valign="top"><a href="#asset">Asset</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">where</td>
<td valign="top"><a href="#assetwhereuniqueinput">AssetWhereUniqueInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>assets</strong></td>
<td valign="top">[<a href="#asset">Asset</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">after</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">before</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">last</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">orderBy</td>
<td valign="top"><a href="#assetorderbyinput">AssetOrderByInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">skip</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">where</td>
<td valign="top"><a href="#assetwhereinput">AssetWhereInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>assetTransfer</strong></td>
<td valign="top"><a href="#assettransfer">AssetTransfer</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">where</td>
<td valign="top"><a href="#assettransferwhereuniqueinput">AssetTransferWhereUniqueInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>assetTransfers</strong></td>
<td valign="top">[<a href="#assettransfer">AssetTransfer</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">after</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">before</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">last</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">orderBy</td>
<td valign="top"><a href="#assettransferorderbyinput">AssetTransferOrderByInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">skip</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">where</td>
<td valign="top"><a href="#assettransferwhereinput">AssetTransferWhereInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>block</strong></td>
<td valign="top"><a href="#block">Block</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">where</td>
<td valign="top"><a href="#blockwhereuniqueinput">BlockWhereUniqueInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>blocks</strong></td>
<td valign="top">[<a href="#block">Block</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">after</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">before</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">last</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">orderBy</td>
<td valign="top"><a href="#blockorderbyinput">BlockOrderByInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">skip</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">where</td>
<td valign="top"><a href="#blockwhereinput">BlockWhereInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>transaction</strong></td>
<td valign="top"><a href="#transaction">Transaction</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">where</td>
<td valign="top"><a href="#transactionwhereuniqueinput">TransactionWhereUniqueInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>transactions</strong></td>
<td valign="top">[<a href="#transaction">Transaction</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">after</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">before</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">last</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">orderBy</td>
<td valign="top"><a href="#transactionorderbyinput">TransactionOrderByInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">skip</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">where</td>
<td valign="top"><a href="#transactionwhereinput">TransactionWhereInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>validator</strong></td>
<td valign="top"><a href="#validator">Validator</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">where</td>
<td valign="top"><a href="#validatorwhereuniqueinput">ValidatorWhereUniqueInput</a>!</td>
<td></td>
</tr>
</tbody>
</table>

## Objects

### Account

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>address</strong></td>
<td valign="top"><a href="#address">Address</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>balances</strong></td>
<td valign="top">[<a href="#balance">Balance</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">after</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">before</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">last</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">orderBy</td>
<td valign="top"><a href="#balanceorderbyinput">BalanceOrderByInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">skip</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">where</td>
<td valign="top"><a href="#balancewhereinput">BalanceWhereInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>transactions</strong></td>
<td valign="top">[<a href="#transaction">Transaction</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">after</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">before</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">last</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">orderBy</td>
<td valign="top"><a href="#transactionorderbyinput">TransactionOrderByInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">skip</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">where</td>
<td valign="top"><a href="#transactionwhereinput">TransactionWhereInput</a></td>
<td></td>
</tr>
</tbody>
</table>

### Asset

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>account</strong></td>
<td valign="top"><a href="#account">Account</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>assetId</strong></td>
<td valign="top"><a href="#hash">Hash</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>assetTransfers</strong></td>
<td valign="top">[<a href="#assettransfer">AssetTransfer</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">after</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">before</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">last</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">skip</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The **full** name of this asset

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>supply</strong></td>
<td valign="top"><a href="#uint64">Uint64</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>symbol</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The **short** name of this asset

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>transaction</strong></td>
<td valign="top"><a href="#transaction">Transaction</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### AssetTransfer

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>asset</strong></td>
<td valign="top"><a href="#asset">Asset</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#account">Account</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#account">Account</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>transaction</strong></td>
<td valign="top"><a href="#transaction">Transaction</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>value</strong></td>
<td valign="top"><a href="#uint64">Uint64</a>!</td>
<td>

The amount of the transfer

</td>
</tr>
</tbody>
</table>

### Balance

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>account</strong></td>
<td valign="top"><a href="#account">Account</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>asset</strong></td>
<td valign="top"><a href="#asset">Asset</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>balance</strong></td>
<td valign="top"><a href="#uint64">Uint64</a>!</td>
<td>

Uint64 balance

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>compound</strong></td>
<td valign="top"><a href="#hash">Hash</a>!</td>
<td>

Same as an id field, but produce by keccak256(address+assetId)

</td>
</tr>
</tbody>
</table>

### Block

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>height</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Block height

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>orderRoot</strong></td>
<td valign="top"><a href="#hash">Hash</a>!</td>
<td>

The ordered transactions Merkle root of a block

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>preHash</strong></td>
<td valign="top"><a href="#hash">Hash</a>!</td>
<td>

The prev block hash

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>proofBitmap</strong></td>
<td valign="top"><a href="#bytes">Bytes</a>!</td>
<td>

The proof of a bitmap

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>proofBlockHash</strong></td>
<td valign="top"><a href="#hash">Hash</a>!</td>
<td>

The proof of prev block hash, same as prevBlockHash

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>proofRound</strong></td>
<td valign="top"><a href="#uint64">Uint64</a>!</td>
<td>

hello world

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>proofSignature</strong></td>
<td valign="top"><a href="#bytes">Bytes</a>!</td>
<td>

The proof of a signature for a block

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>proposer</strong></td>
<td valign="top"><a href="#address">Address</a>!</td>
<td>

The address of the proposer of a block

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>stateRoot</strong></td>
<td valign="top"><a href="#hash">Hash</a>!</td>
<td>

The Merkle root of state root

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>timestamp</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

A datetime string format as yyyy-MM-dd'T'HH:mm:ss.SSSZ

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>transactions</strong></td>
<td valign="top">[<a href="#transaction">Transaction</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">after</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">before</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">last</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">skip</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>transactionsCount</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Show how many transactions in the block

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>validators</strong></td>
<td valign="top">[<a href="#validator">Validator</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">after</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">before</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">last</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">skip</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>validatorVersion</strong></td>
<td valign="top"><a href="#uint64">Uint64</a>!</td>
<td>

The version of validators

</td>
</tr>
</tbody>
</table>

### Event

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>data</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Event payload, convenience for debug

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>service</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

The event emitted from which service

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>transaction</strong></td>
<td valign="top"><a href="#transaction">Transaction</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### Transaction

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>block</strong></td>
<td valign="top"><a href="#block">Block</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>cyclesLimit</strong></td>
<td valign="top"><a href="#uint64">Uint64</a>!</td>
<td>

Cycles price, similar to the `gasLimit` in eth

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>cyclesPrice</strong></td>
<td valign="top"><a href="#uint64">Uint64</a>!</td>
<td>

Cycles price, similar to the `gasPrice` in eth

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>cyclesUsed</strong></td>
<td valign="top"><a href="#uint64">Uint64</a>!</td>
<td>

Cycles used, similar to the `gasUsed` in eth

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#account">Account</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>method</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Represents what `method` does the transaction called 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>nonce</strong></td>
<td valign="top"><a href="#hash">Hash</a>!</td>
<td>

A random 32 bytes, the `nonce` in Muta is difference with Ethereum

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>order</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

The transaction order number of all transactions 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>payload</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Represents what `payload` of the transaction called method

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>pubkey</strong></td>
<td valign="top"><a href="#bytes">Bytes</a>!</td>
<td>

Public key of of a transaction sender

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>receiptIsError</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>receiptRet</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

Transaction response, is often a string in json format

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>serviceName</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Represents what `service` does the transaction called 

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>signature</strong></td>
<td valign="top"><a href="#bytes">Bytes</a>!</td>
<td>

Signature of a transaction

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>txHash</strong></td>
<td valign="top"><a href="#hash">Hash</a>!</td>
<td>

The transaction hash

</td>
</tr>
</tbody>
</table>

### Validator

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>address</strong></td>
<td valign="top"><a href="#address">Address</a>!</td>
<td>

A validator address

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>blocks</strong></td>
<td valign="top">[<a href="#block">Block</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">after</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">before</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">last</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">skip</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>proposeWeight</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Propose weight of a validator

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>voteWeight</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Vote weight of a validator

</td>
</tr>
</tbody>
</table>

## Inputs

### AccountOrderByInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>address</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
</tbody>
</table>

### AccountWhereInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>address</strong></td>
<td valign="top"><a href="#stringfilter">StringFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>AND</strong></td>
<td valign="top">[<a href="#accountwhereinput">AccountWhereInput</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>assets</strong></td>
<td valign="top"><a href="#assetfilter">AssetFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>balances</strong></td>
<td valign="top"><a href="#balancefilter">BalanceFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>NOT</strong></td>
<td valign="top">[<a href="#accountwhereinput">AccountWhereInput</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>OR</strong></td>
<td valign="top">[<a href="#accountwhereinput">AccountWhereInput</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>transactions</strong></td>
<td valign="top"><a href="#transactionfilter">TransactionFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>transferFrom</strong></td>
<td valign="top"><a href="#assettransferfilter">AssetTransferFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>transferTo</strong></td>
<td valign="top"><a href="#assettransferfilter">AssetTransferFilter</a></td>
<td></td>
</tr>
</tbody>
</table>

### AccountWhereUniqueInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>address</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### AssetFilter

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>every</strong></td>
<td valign="top"><a href="#assetwhereinput">AssetWhereInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>none</strong></td>
<td valign="top"><a href="#assetwhereinput">AssetWhereInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>some</strong></td>
<td valign="top"><a href="#assetwhereinput">AssetWhereInput</a></td>
<td></td>
</tr>
</tbody>
</table>

### AssetOrderByInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>assetId</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>supply</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>symbol</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
</tbody>
</table>

### AssetTransferFilter

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>every</strong></td>
<td valign="top"><a href="#assettransferwhereinput">AssetTransferWhereInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>none</strong></td>
<td valign="top"><a href="#assettransferwhereinput">AssetTransferWhereInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>some</strong></td>
<td valign="top"><a href="#assettransferwhereinput">AssetTransferWhereInput</a></td>
<td></td>
</tr>
</tbody>
</table>

### AssetTransferOrderByInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>value</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
</tbody>
</table>

### AssetTransferWhereInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>AND</strong></td>
<td valign="top">[<a href="#assettransferwhereinput">AssetTransferWhereInput</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>asset</strong></td>
<td valign="top"><a href="#assetwhereinput">AssetWhereInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#accountwhereinput">AccountWhereInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#intfilter">IntFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>NOT</strong></td>
<td valign="top">[<a href="#assettransferwhereinput">AssetTransferWhereInput</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>OR</strong></td>
<td valign="top">[<a href="#assettransferwhereinput">AssetTransferWhereInput</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#accountwhereinput">AccountWhereInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>transaction</strong></td>
<td valign="top"><a href="#transactionwhereinput">TransactionWhereInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>value</strong></td>
<td valign="top"><a href="#stringfilter">StringFilter</a></td>
<td></td>
</tr>
</tbody>
</table>

### AssetTransferWhereUniqueInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
</tbody>
</table>

### AssetWhereInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>account</strong></td>
<td valign="top"><a href="#accountwhereinput">AccountWhereInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>AND</strong></td>
<td valign="top">[<a href="#assetwhereinput">AssetWhereInput</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>assetId</strong></td>
<td valign="top"><a href="#stringfilter">StringFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>assetTransfers</strong></td>
<td valign="top"><a href="#assettransferfilter">AssetTransferFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>balances</strong></td>
<td valign="top"><a href="#balancefilter">BalanceFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#stringfilter">StringFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>NOT</strong></td>
<td valign="top">[<a href="#assetwhereinput">AssetWhereInput</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>OR</strong></td>
<td valign="top">[<a href="#assetwhereinput">AssetWhereInput</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>supply</strong></td>
<td valign="top"><a href="#stringfilter">StringFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>symbol</strong></td>
<td valign="top"><a href="#stringfilter">StringFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>transaction</strong></td>
<td valign="top"><a href="#transactionwhereinput">TransactionWhereInput</a></td>
<td></td>
</tr>
</tbody>
</table>

### AssetWhereUniqueInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>assetId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### BalanceFilter

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>every</strong></td>
<td valign="top"><a href="#balancewhereinput">BalanceWhereInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>none</strong></td>
<td valign="top"><a href="#balancewhereinput">BalanceWhereInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>some</strong></td>
<td valign="top"><a href="#balancewhereinput">BalanceWhereInput</a></td>
<td></td>
</tr>
</tbody>
</table>

### BalanceOrderByInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>balance</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>compound</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
</tbody>
</table>

### BalanceWhereInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>account</strong></td>
<td valign="top"><a href="#accountwhereinput">AccountWhereInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>AND</strong></td>
<td valign="top">[<a href="#balancewhereinput">BalanceWhereInput</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>asset</strong></td>
<td valign="top"><a href="#assetwhereinput">AssetWhereInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>balance</strong></td>
<td valign="top"><a href="#stringfilter">StringFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>compound</strong></td>
<td valign="top"><a href="#stringfilter">StringFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#intfilter">IntFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>NOT</strong></td>
<td valign="top">[<a href="#balancewhereinput">BalanceWhereInput</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>OR</strong></td>
<td valign="top">[<a href="#balancewhereinput">BalanceWhereInput</a>!]</td>
<td></td>
</tr>
</tbody>
</table>

### BlockFilter

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>every</strong></td>
<td valign="top"><a href="#blockwhereinput">BlockWhereInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>none</strong></td>
<td valign="top"><a href="#blockwhereinput">BlockWhereInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>some</strong></td>
<td valign="top"><a href="#blockwhereinput">BlockWhereInput</a></td>
<td></td>
</tr>
</tbody>
</table>

### BlockOrderByInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>execHeight</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>height</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>orderRoot</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>preHash</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>proofBitmap</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>proofBlockHash</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>proofRound</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>proofSignature</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>proposer</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>stateRoot</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>timestamp</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>transactionsCount</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>validatorVersion</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
</tbody>
</table>

### BlockWhereInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>AND</strong></td>
<td valign="top">[<a href="#blockwhereinput">BlockWhereInput</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>execHeight</strong></td>
<td valign="top"><a href="#intfilter">IntFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>height</strong></td>
<td valign="top"><a href="#intfilter">IntFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>NOT</strong></td>
<td valign="top">[<a href="#blockwhereinput">BlockWhereInput</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>OR</strong></td>
<td valign="top">[<a href="#blockwhereinput">BlockWhereInput</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>orderRoot</strong></td>
<td valign="top"><a href="#stringfilter">StringFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>preHash</strong></td>
<td valign="top"><a href="#stringfilter">StringFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>proofBitmap</strong></td>
<td valign="top"><a href="#stringfilter">StringFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>proofBlockHash</strong></td>
<td valign="top"><a href="#stringfilter">StringFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>proofRound</strong></td>
<td valign="top"><a href="#stringfilter">StringFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>proofSignature</strong></td>
<td valign="top"><a href="#stringfilter">StringFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>proposer</strong></td>
<td valign="top"><a href="#stringfilter">StringFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>stateRoot</strong></td>
<td valign="top"><a href="#stringfilter">StringFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>timestamp</strong></td>
<td valign="top"><a href="#datetimefilter">DateTimeFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>transactions</strong></td>
<td valign="top"><a href="#transactionfilter">TransactionFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>transactionsCount</strong></td>
<td valign="top"><a href="#intfilter">IntFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>validators</strong></td>
<td valign="top"><a href="#validatorfilter">ValidatorFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>validatorVersion</strong></td>
<td valign="top"><a href="#stringfilter">StringFilter</a></td>
<td></td>
</tr>
</tbody>
</table>

### BlockWhereUniqueInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>height</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
</tbody>
</table>

### DateTimeFilter

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>equals</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>gt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>gte</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>in</strong></td>
<td valign="top">[<a href="#datetime">DateTime</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lte</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>not</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>notIn</strong></td>
<td valign="top">[<a href="#datetime">DateTime</a>!]</td>
<td></td>
</tr>
</tbody>
</table>

### EventFilter

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>every</strong></td>
<td valign="top"><a href="#eventwhereinput">EventWhereInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>none</strong></td>
<td valign="top"><a href="#eventwhereinput">EventWhereInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>some</strong></td>
<td valign="top"><a href="#eventwhereinput">EventWhereInput</a></td>
<td></td>
</tr>
</tbody>
</table>

### EventWhereInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>AND</strong></td>
<td valign="top">[<a href="#eventwhereinput">EventWhereInput</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>data</strong></td>
<td valign="top"><a href="#stringfilter">StringFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#intfilter">IntFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>NOT</strong></td>
<td valign="top">[<a href="#eventwhereinput">EventWhereInput</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>OR</strong></td>
<td valign="top">[<a href="#eventwhereinput">EventWhereInput</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>receipt</strong></td>
<td valign="top"><a href="#transactionwhereinput">TransactionWhereInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>service</strong></td>
<td valign="top"><a href="#stringfilter">StringFilter</a></td>
<td></td>
</tr>
</tbody>
</table>

### IntFilter

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>equals</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>gt</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>gte</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>in</strong></td>
<td valign="top">[<a href="#int">Int</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lt</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lte</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>not</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>notIn</strong></td>
<td valign="top">[<a href="#int">Int</a>!]</td>
<td></td>
</tr>
</tbody>
</table>

### NullableBooleanFilter

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>equals</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>not</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
</tbody>
</table>

### NullableStringFilter

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>contains</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>endsWith</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>equals</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>gt</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>gte</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>in</strong></td>
<td valign="top">[<a href="#string">String</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lt</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lte</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>not</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>notIn</strong></td>
<td valign="top">[<a href="#string">String</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>startsWith</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### StringFilter

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>contains</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>endsWith</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>equals</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>gt</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>gte</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>in</strong></td>
<td valign="top">[<a href="#string">String</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lt</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lte</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>not</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>notIn</strong></td>
<td valign="top">[<a href="#string">String</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>startsWith</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### TransactionFilter

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>every</strong></td>
<td valign="top"><a href="#transactionwhereinput">TransactionWhereInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>none</strong></td>
<td valign="top"><a href="#transactionwhereinput">TransactionWhereInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>some</strong></td>
<td valign="top"><a href="#transactionwhereinput">TransactionWhereInput</a></td>
<td></td>
</tr>
</tbody>
</table>

### TransactionOrderByInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>chainId</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>cyclesLimit</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>cyclesPrice</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>cyclesUsed</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>method</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>nonce</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>order</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>payload</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>pubkey</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>receiptIsError</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>receiptRet</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>serviceName</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>signature</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>timeout</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>txHash</strong></td>
<td valign="top"><a href="#orderbyarg">OrderByArg</a></td>
<td></td>
</tr>
</tbody>
</table>

### TransactionWhereInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>AND</strong></td>
<td valign="top">[<a href="#transactionwhereinput">TransactionWhereInput</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>block</strong></td>
<td valign="top"><a href="#blockwhereinput">BlockWhereInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>chainId</strong></td>
<td valign="top"><a href="#stringfilter">StringFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAsset</strong></td>
<td valign="top"><a href="#assetwhereinput">AssetWhereInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>cyclesLimit</strong></td>
<td valign="top"><a href="#stringfilter">StringFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>cyclesPrice</strong></td>
<td valign="top"><a href="#stringfilter">StringFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>cyclesUsed</strong></td>
<td valign="top"><a href="#nullablestringfilter">NullableStringFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>events</strong></td>
<td valign="top"><a href="#eventfilter">EventFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#accountwhereinput">AccountWhereInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>method</strong></td>
<td valign="top"><a href="#stringfilter">StringFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>nonce</strong></td>
<td valign="top"><a href="#stringfilter">StringFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>NOT</strong></td>
<td valign="top">[<a href="#transactionwhereinput">TransactionWhereInput</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>OR</strong></td>
<td valign="top">[<a href="#transactionwhereinput">TransactionWhereInput</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>order</strong></td>
<td valign="top"><a href="#intfilter">IntFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>payload</strong></td>
<td valign="top"><a href="#stringfilter">StringFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>pubkey</strong></td>
<td valign="top"><a href="#stringfilter">StringFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>receiptIsError</strong></td>
<td valign="top"><a href="#nullablebooleanfilter">NullableBooleanFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>receiptRet</strong></td>
<td valign="top"><a href="#nullablestringfilter">NullableStringFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>serviceName</strong></td>
<td valign="top"><a href="#stringfilter">StringFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>signature</strong></td>
<td valign="top"><a href="#stringfilter">StringFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>timeout</strong></td>
<td valign="top"><a href="#stringfilter">StringFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>transfer</strong></td>
<td valign="top"><a href="#assettransferwhereinput">AssetTransferWhereInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>txHash</strong></td>
<td valign="top"><a href="#stringfilter">StringFilter</a></td>
<td></td>
</tr>
</tbody>
</table>

### TransactionWhereUniqueInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>order</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>txHash</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### ValidatorFilter

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>every</strong></td>
<td valign="top"><a href="#validatorwhereinput">ValidatorWhereInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>none</strong></td>
<td valign="top"><a href="#validatorwhereinput">ValidatorWhereInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>some</strong></td>
<td valign="top"><a href="#validatorwhereinput">ValidatorWhereInput</a></td>
<td></td>
</tr>
</tbody>
</table>

### ValidatorWhereInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>address</strong></td>
<td valign="top"><a href="#stringfilter">StringFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>AND</strong></td>
<td valign="top">[<a href="#validatorwhereinput">ValidatorWhereInput</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>blocks</strong></td>
<td valign="top"><a href="#blockfilter">BlockFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>NOT</strong></td>
<td valign="top">[<a href="#validatorwhereinput">ValidatorWhereInput</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>OR</strong></td>
<td valign="top">[<a href="#validatorwhereinput">ValidatorWhereInput</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>proposeWeight</strong></td>
<td valign="top"><a href="#intfilter">IntFilter</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>voteWeight</strong></td>
<td valign="top"><a href="#intfilter">IntFilter</a></td>
<td></td>
</tr>
</tbody>
</table>

### ValidatorWhereUniqueInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>address</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

## Enums

### OrderByArg

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>desc</strong></td>
<td></td>
</tr>
</tbody>
</table>

## Scalars

### Address

The `Address` of an account, encoded to 40 length lowercase hex string

### Boolean

The `Boolean` scalar type represents `true` or `false`.

### Bytes

Bytes corresponding hex string

### DateTime

### Hash

A 64 length lowercase hex string, the output digest of [keccak](https://en.wikipedia.org/wiki/SHA-3) hash function

### Int

The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.

### String

The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.

### Uint64

Uint64，encoded to a hex string 

