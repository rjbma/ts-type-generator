import { RequestHandler } from "express";
declare namespace Components {
  namespace RequestBodies {
    export interface CompleteAccountAccessAuthRequest {
      code: string;
    }
    export interface InitializeAccountAccessConsentRequest {}
    export interface InitiateAccountAccessAuthRequest {
      RedirectUri: string;
    }
  }
  namespace Schemas {
    export interface Account {
      AccountId: string;
      Resource: {
        /**
         * Unambiguous identification of the account to which credit and debit entries are made.
         */
        Data: {
          /**
           * A unique and immutable identifier used to identify the account resource. This identifier has no meaning to the account owner.
           */
          AccountId: string;
          /**
           * Specifies the status of account resource in code form.
           */
          Status?: "Deleted" | "Disabled" | "Enabled" | "Pending" | "ProForma";
          /**
           * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          StatusUpdateDateTime?: string; // date-time
          /**
           * Identification of the currency in which the account is held.
           * Usage: Currency should only be used in case one and the same account number covers several currencies
           * and the initiating party needs to identify which currency needs to be used for settlement on the account.
           */
          Currency: string; // ^[A-Z]{3,3}$
          /**
           * Specifies the type of account (personal or business).
           */
          AccountType: "Business" | "Personal";
          /**
           * Specifies the sub type of account (product family group).
           */
          AccountSubType:
            | "ChargeCard"
            | "CreditCard"
            | "CurrentAccount"
            | "EMoney"
            | "Loan"
            | "Mortgage"
            | "PrePaidCard"
            | "Savings";
          /**
           * Specifies the description of the account type.
           */
          Description?: string;
          /**
           * The nickname of the account, assigned by the account owner in order to provide an additional means of identification of the account.
           */
          Nickname?: string;
          /**
           * Date on which the account and related basic services are effectively operational for the account owner.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          OpeningDate?: string; // date-time
          /**
           * Maturity date of the account.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          MaturityDate?: string; // date-time
          /**
           * Specifies the switch status for the account, in a coded form.
           */
          SwitchStatus?: string;
          Account?: {
            /**
             * Name of the identification scheme, in a coded form as published in an external list.
             */
            SchemeName: string;
            /**
             * Identification assigned by an institution to identify an account. This identification is known by the account owner.
             */
            Identification: string;
            /**
             * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
             * Note, the account name is not the product name or the nickname of the account.
             */
            Name?: string;
            /**
             * This is secondary identification of the account, as assigned by the account servicing institution.
             * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
             */
            SecondaryIdentification?: string;
          }[];
          /**
           * Party that manages the account on behalf of the account owner, that is manages the registration and booking of entries on the account, calculates balances on the account and provides information about the account.
           */
          Servicer?: {
            /**
             * Name of the identification scheme, in a coded form as published in an external list.
             */
            SchemeName: string;
            /**
             * Unique and unambiguous identification of the servicing institution.
             */
            Identification: string;
          };
        };
      };
      Partnership: {
        PartnershipId: string;
        CustomerFriendlyName: string;
        CustomerFriendlyLogoUri?: string;
      };
      /**
       * Tags associated with the resource
       */
      Tags?: string[];
    }
    export interface AccountAccessConsent {
      ConsentId: string;
      ConsentType: "AccountAccess";
      Partnership?: {
        PartnershipId: string;
        CustomerFriendlyName: string;
        CustomerFriendlyLogoUri?: string;
      };
      Resource: {
        Data: {
          /**
           * Unique identification as assigned to identify the account access consent resource.
           */
          ConsentId: string;
          /**
           * Date and time at which the resource was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          CreationDateTime: string; // date-time
          /**
           * Specifies the status of consent resource in code form.
           */
          Status:
            | "Authorised"
            | "AwaitingAuthorisation"
            | "Rejected"
            | "Revoked";
          /**
           * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          StatusUpdateDateTime: string; // date-time
          Permissions: (
            | "ReadAccountsBasic"
            | "ReadAccountsDetail"
            | "ReadBalances"
            | "ReadBeneficiariesBasic"
            | "ReadBeneficiariesDetail"
            | "ReadDirectDebits"
            | "ReadOffers"
            | "ReadPAN"
            | "ReadParty"
            | "ReadPartyPSU"
            | "ReadProducts"
            | "ReadScheduledPaymentsBasic"
            | "ReadScheduledPaymentsDetail"
            | "ReadStandingOrdersBasic"
            | "ReadStandingOrdersDetail"
            | "ReadStatementsBasic"
            | "ReadStatementsDetail"
            | "ReadTransactionsBasic"
            | "ReadTransactionsCredits"
            | "ReadTransactionsDebits"
            | "ReadTransactionsDetail"
          )[];
          /**
           * Specified date and time the permissions will expire.
           * If this is not populated, the permissions will be open ended.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          ExpirationDateTime?: string; // date-time
          /**
           * Specified start date and time for the transaction query period.
           * If this is not populated, the start date will be open ended, and data will be returned from the earliest available transaction.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          TransactionFromDateTime?: string; // date-time
          /**
           * Specified end date and time for the transaction query period.
           * If this is not populated, the end date will be open ended, and data will be returned to the latest available transaction.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          TransactionToDateTime?: string; // date-time
        };
        /**
         * The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Account Info.
         */
        Risk: unknown;
      };
      /**
       * Tags associated with the resource
       */
      Tags?: string[];
    }
    export interface AccountConsentInputResource {
      Data: {
        Permissions: (
          | "ReadAccountsBasic"
          | "ReadAccountsDetail"
          | "ReadBalances"
          | "ReadBeneficiariesBasic"
          | "ReadBeneficiariesDetail"
          | "ReadDirectDebits"
          | "ReadOffers"
          | "ReadPAN"
          | "ReadParty"
          | "ReadPartyPSU"
          | "ReadProducts"
          | "ReadScheduledPaymentsBasic"
          | "ReadScheduledPaymentsDetail"
          | "ReadStandingOrdersBasic"
          | "ReadStandingOrdersDetail"
          | "ReadStatementsBasic"
          | "ReadStatementsDetail"
          | "ReadTransactionsBasic"
          | "ReadTransactionsCredits"
          | "ReadTransactionsDebits"
          | "ReadTransactionsDetail"
        )[];
        /**
         * Specified date and time the permissions will expire.
         * If this is not populated, the permissions will be open ended.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        ExpirationDateTime?: string; // date-time
        /**
         * Specified start date and time for the transaction query period.
         * If this is not populated, the start date will be open ended, and data will be returned from the earliest available transaction.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        TransactionFromDateTime?: string; // date-time
        /**
         * Specified end date and time for the transaction query period.
         * If this is not populated, the end date will be open ended, and data will be returned to the latest available transaction.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        TransactionToDateTime?: string; // date-time
      };
      /**
       * The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Account Info.
       */
      Risk: unknown;
    }
    export interface AccountConsentResource {
      Data: {
        /**
         * Unique identification as assigned to identify the account access consent resource.
         */
        ConsentId: string;
        /**
         * Date and time at which the resource was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        CreationDateTime: string; // date-time
        /**
         * Specifies the status of consent resource in code form.
         */
        Status: "Authorised" | "AwaitingAuthorisation" | "Rejected" | "Revoked";
        /**
         * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        StatusUpdateDateTime: string; // date-time
        Permissions: (
          | "ReadAccountsBasic"
          | "ReadAccountsDetail"
          | "ReadBalances"
          | "ReadBeneficiariesBasic"
          | "ReadBeneficiariesDetail"
          | "ReadDirectDebits"
          | "ReadOffers"
          | "ReadPAN"
          | "ReadParty"
          | "ReadPartyPSU"
          | "ReadProducts"
          | "ReadScheduledPaymentsBasic"
          | "ReadScheduledPaymentsDetail"
          | "ReadStandingOrdersBasic"
          | "ReadStandingOrdersDetail"
          | "ReadStatementsBasic"
          | "ReadStatementsDetail"
          | "ReadTransactionsBasic"
          | "ReadTransactionsCredits"
          | "ReadTransactionsDebits"
          | "ReadTransactionsDetail"
        )[];
        /**
         * Specified date and time the permissions will expire.
         * If this is not populated, the permissions will be open ended.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        ExpirationDateTime?: string; // date-time
        /**
         * Specified start date and time for the transaction query period.
         * If this is not populated, the start date will be open ended, and data will be returned from the earliest available transaction.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        TransactionFromDateTime?: string; // date-time
        /**
         * Specified end date and time for the transaction query period.
         * If this is not populated, the end date will be open ended, and data will be returned to the latest available transaction.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        TransactionToDateTime?: string; // date-time
      };
      /**
       * The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Account Info.
       */
      Risk: unknown;
    }
    export interface AccountResource {
      /**
       * Unambiguous identification of the account to which credit and debit entries are made.
       */
      Data: {
        /**
         * A unique and immutable identifier used to identify the account resource. This identifier has no meaning to the account owner.
         */
        AccountId: string;
        /**
         * Specifies the status of account resource in code form.
         */
        Status?: "Deleted" | "Disabled" | "Enabled" | "Pending" | "ProForma";
        /**
         * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        StatusUpdateDateTime?: string; // date-time
        /**
         * Identification of the currency in which the account is held.
         * Usage: Currency should only be used in case one and the same account number covers several currencies
         * and the initiating party needs to identify which currency needs to be used for settlement on the account.
         */
        Currency: string; // ^[A-Z]{3,3}$
        /**
         * Specifies the type of account (personal or business).
         */
        AccountType: "Business" | "Personal";
        /**
         * Specifies the sub type of account (product family group).
         */
        AccountSubType:
          | "ChargeCard"
          | "CreditCard"
          | "CurrentAccount"
          | "EMoney"
          | "Loan"
          | "Mortgage"
          | "PrePaidCard"
          | "Savings";
        /**
         * Specifies the description of the account type.
         */
        Description?: string;
        /**
         * The nickname of the account, assigned by the account owner in order to provide an additional means of identification of the account.
         */
        Nickname?: string;
        /**
         * Date on which the account and related basic services are effectively operational for the account owner.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        OpeningDate?: string; // date-time
        /**
         * Maturity date of the account.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        MaturityDate?: string; // date-time
        /**
         * Specifies the switch status for the account, in a coded form.
         */
        SwitchStatus?: string;
        Account?: {
          /**
           * Name of the identification scheme, in a coded form as published in an external list.
           */
          SchemeName: string;
          /**
           * Identification assigned by an institution to identify an account. This identification is known by the account owner.
           */
          Identification: string;
          /**
           * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
           * Note, the account name is not the product name or the nickname of the account.
           */
          Name?: string;
          /**
           * This is secondary identification of the account, as assigned by the account servicing institution.
           * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
           */
          SecondaryIdentification?: string;
        }[];
        /**
         * Party that manages the account on behalf of the account owner, that is manages the registration and booking of entries on the account, calculates balances on the account and provides information about the account.
         */
        Servicer?: {
          /**
           * Name of the identification scheme, in a coded form as published in an external list.
           */
          SchemeName: string;
          /**
           * Unique and unambiguous identification of the servicing institution.
           */
          Identification: string;
        };
      };
    }
    export interface CompleteAccountAccessAuthRequest {
      code: string;
    }
    export interface ConfirmationOfPayeeData {
      SchemeName: "SortCodeAccountNumber";
      AccountType: "Personal" | "Business";
      Name: string;
      Identification: string;
    }
    export interface ConfirmationOfPayeeInputResource {
      Data: {
        SchemeName: "SortCodeAccountNumber";
        AccountType: "Personal" | "Business";
        Name: string;
        Identification: string;
      };
    }
    export interface ConfirmationOfPayeeRequest {
      Resource: {
        Data: {
          SchemeName: "SortCodeAccountNumber";
          AccountType: "Personal" | "Business";
          Name: string;
          Identification: string;
        };
      };
    }
    export interface ConfirmationOfPayeeResponse {
      Resource: {
        Data: {
          VerificationReport: {
            /**
             * Whether the name was matched
             */
            Matched: boolean;
            /**
             * Code of the reason why the match was **not** successful
             */
            ReasonCode?:
              | "ANNM"
              | "MBAM"
              | "BANM"
              | "PANM"
              | "BAMM"
              | "PAMM"
              | "AC01"
              | "IVCR"
              | "ACNS"
              | "OPTO"
              | "CASS"
              | "SCNS";
            /**
             * Name of possible match, if applicable according to `ReasonCode`
             */
            Name?: string;
          };
        };
      };
    }
    export interface ConfirmationOfPayeeResponseData {
      VerificationReport: {
        /**
         * Whether the name was matched
         */
        Matched: boolean;
        /**
         * Code of the reason why the match was **not** successful
         */
        ReasonCode?:
          | "ANNM"
          | "MBAM"
          | "BANM"
          | "PANM"
          | "BAMM"
          | "PAMM"
          | "AC01"
          | "IVCR"
          | "ACNS"
          | "OPTO"
          | "CASS"
          | "SCNS";
        /**
         * Name of possible match, if applicable according to `ReasonCode`
         */
        Name?: string;
      };
    }
    export interface ConsentAutorisationResponse {
      /**
       * ID of the consent being authorised
       */
      ConsentId: string;
      /**
       * Redirect URL used to complete the authorisation
       */
      AuthUrl: string;
      /**
       * Random generated string that uniquely identifies the authorisation request
       */
      AuthState: string;
      RedirectUri: string;
    }
    export interface CreateAccountAccessConsentRequest {
      Resource: {
        Data: {
          Permissions: (
            | "ReadAccountsBasic"
            | "ReadAccountsDetail"
            | "ReadBalances"
            | "ReadBeneficiariesBasic"
            | "ReadBeneficiariesDetail"
            | "ReadDirectDebits"
            | "ReadOffers"
            | "ReadPAN"
            | "ReadParty"
            | "ReadPartyPSU"
            | "ReadProducts"
            | "ReadScheduledPaymentsBasic"
            | "ReadScheduledPaymentsDetail"
            | "ReadStandingOrdersBasic"
            | "ReadStandingOrdersDetail"
            | "ReadStatementsBasic"
            | "ReadStatementsDetail"
            | "ReadTransactionsBasic"
            | "ReadTransactionsCredits"
            | "ReadTransactionsDebits"
            | "ReadTransactionsDetail"
          )[];
          /**
           * Specified date and time the permissions will expire.
           * If this is not populated, the permissions will be open ended.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          ExpirationDateTime?: string; // date-time
          /**
           * Specified start date and time for the transaction query period.
           * If this is not populated, the start date will be open ended, and data will be returned from the earliest available transaction.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          TransactionFromDateTime?: string; // date-time
          /**
           * Specified end date and time for the transaction query period.
           * If this is not populated, the end date will be open ended, and data will be returned to the latest available transaction.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          TransactionToDateTime?: string; // date-time
        };
        /**
         * The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Account Info.
         */
        Risk: unknown;
      };
      /**
       * Tags to associate with the resource
       */
      Tags?: string[];
    }
    export interface CreateDomesticPaymentConsentRequest {
      Resource: {
        Data: {
          /**
           * Specifies to share the refund account details with PISP
           */
          ReadRefundAccount?: "No" | "Yes";
          /**
           * The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single domestic payment.
           */
          Initiation: {
            /**
             * Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction.
             * Usage: the  instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction.
             */
            InstructionIdentification: string;
            /**
             * Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain.
             * Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction.
             * OB: The Faster Payments Scheme can only access 31 characters for the EndToEndIdentification field.
             */
            EndToEndIdentification: string;
            /**
             * User community specific instrument.
             * Usage: This element is used to specify a local instrument, local clearing option and/or further qualify the service or service level.
             */
            LocalInstrument?: string;
            /**
             * Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party.
             * Usage: This amount has to be transported unchanged through the transaction chain.
             */
            InstructedAmount: {
              /**
               * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
               */
              Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
              /**
               * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
               */
              Currency: string; // ^[A-Z]{3,3}$
            };
            /**
             * Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction.
             */
            DebtorAccount?: {
              /**
               * Name of the identification scheme, in a coded form as published in an external list.
               */
              SchemeName: string;
              /**
               * Identification assigned by an institution to identify an account. This identification is known by the account owner.
               */
              Identification: string;
              /**
               * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
               * Note, the account name is not the product name or the nickname of the account.
               */
              Name?: string;
              /**
               * This is secondary identification of the account, as assigned by the account servicing institution.
               * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
               */
              SecondaryIdentification?: string;
            };
            /**
             * Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction.
             */
            CreditorAccount: {
              /**
               * Name of the identification scheme, in a coded form as published in an external list.
               */
              SchemeName: string;
              /**
               * Identification assigned by an institution to identify an account. This identification is known by the account owner.
               */
              Identification: string;
              /**
               * The account name is the name or names of the account owner(s) represented at an account level.
               * Note, the account name is not the product name or the nickname of the account.
               * OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory.
               */
              Name: string;
              /**
               * This is secondary identification of the account, as assigned by the account servicing institution.
               * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
               */
              SecondaryIdentification?: string;
            };
            /**
             * Information that locates and identifies a specific address, as defined by postal services.
             */
            CreditorPostalAddress?: {
              /**
               * Identifies the nature of the postal address.
               */
              AddressType?:
                | "Business"
                | "Correspondence"
                | "DeliveryTo"
                | "MailTo"
                | "POBox"
                | "Postal"
                | "Residential"
                | "Statement";
              /**
               * Identification of a division of a large organisation or building.
               */
              Department?: string;
              /**
               * Identification of a sub-division of a large organisation or building.
               */
              SubDepartment?: string;
              /**
               * Name of a street or thoroughfare.
               */
              StreetName?: string;
              /**
               * Number that identifies the position of a building on a street.
               */
              BuildingNumber?: string;
              /**
               * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
               */
              PostCode?: string;
              /**
               * Name of a built-up area, with defined boundaries, and a local government.
               */
              TownName?: string;
              /**
               * Identifies a subdivision of a country such as state, region, county.
               */
              CountrySubDivision?: string;
              /**
               * Nation with its own government.
               */
              Country?: string; // ^[A-Z]{2,2}$
              AddressLine?: string[];
            };
            /**
             * Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system.
             */
            RemittanceInformation?: {
              /**
               * Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form.
               */
              Unstructured?: string;
              /**
               * Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction.
               * Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money.
               * If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification.
               * OB: The Faster Payments Scheme can only accept 18 characters for the ReferenceInformation field - which is where this ISO field will be mapped.
               */
              Reference?: string;
            };
            /**
             * Additional information that can not be captured in the structured fields and/or any other specific block.
             */
            SupplementaryData?: unknown;
          };
          /**
           * The authorisation type request from the TPP.
           */
          Authorisation?: {
            /**
             * Type of authorisation flow requested.
             */
            AuthorisationType: "Any" | "Single";
            /**
             * Date and time at which the requested authorisation flow must be completed.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            CompletionDateTime?: string; // date-time
          };
          /**
           * Supporting Data provided by TPP, when requesting SCA Exemption.
           */
          SCASupportData?: {
            /**
             * This field allows a PISP to request specific SCA Exemption for a Payment Initiation
             */
            RequestedSCAExemptionType?:
              | "BillPayment"
              | "ContactlessTravel"
              | "EcommerceGoods"
              | "EcommerceServices"
              | "Kiosk"
              | "Parking"
              | "PartyToParty";
            /**
             * Specifies a character string with a maximum length of 40 characters.
             * Usage: This field indicates whether the PSU was subject to SCA performed by the TPP
             */
            AppliedAuthenticationApproach?: "CA" | "SCA";
            /**
             * Specifies a character string with a maximum length of 140 characters.
             * Usage: If the payment is recurring then the transaction identifier of the previous payment occurrence so that the ASPSP can verify that the PISP, amount and the payee are the same as the previous occurrence.
             */
            ReferencePaymentOrderId?: string;
          };
        };
        /**
         * The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments.
         */
        Risk: {
          /**
           * Specifies the payment context
           */
          PaymentContextCode?:
            | "BillPayment"
            | "EcommerceGoods"
            | "EcommerceServices"
            | "Other"
            | "PartyToParty";
          /**
           * Category code conform to ISO 18245, related to the type of services or goods the merchant provides for the transaction.
           */
          MerchantCategoryCode?: string;
          /**
           * The unique customer identifier of the PSU with the merchant.
           */
          MerchantCustomerIdentification?: string;
          /**
           * Information that locates and identifies a specific address, as defined by postal services or in free format text.
           */
          DeliveryAddress?: {
            AddressLine?: string[];
            /**
             * Name of a street or thoroughfare.
             */
            StreetName?: string;
            /**
             * Number that identifies the position of a building on a street.
             */
            BuildingNumber?: string;
            /**
             * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
             */
            PostCode?: string;
            /**
             * Name of a built-up area, with defined boundaries, and a local government.
             */
            TownName: string;
            /**
             * Identifies a subdivision of a country such as state, region, county.
             */
            CountrySubDivision?: string;
            /**
             * Nation with its own government, occupying a particular territory.
             */
            Country: string; // ^[A-Z]{2,2}$
          };
        };
      };
      /**
       * Tags to associate with the resource
       */
      Tags?: string[];
    }
    export interface CreateFundsConfirmationConsentRequest {
      Resource: {
        Data: {
          /**
           * Specified date and time the funds confirmation authorisation will expire.
           *  If this is not populated, the authorisation will be open ended.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          ExpirationDateTime?: string; // date-time
          /**
           * Unambiguous identification of the account of the debtor to which a confirmation of funds consent will be applied.
           */
          DebtorAccount: {
            /**
             * Name of the identification scheme, in a coded form as published in an external list.
             */
            SchemeName: string;
            /**
             * Identification assigned by an institution to identify an account. This identification is known by the account owner.
             */
            Identification: string;
            /**
             * Name of the account, as assigned by the account servicing institution.
             * Usage: The account name is the name or names of the account owner(s) represented at an account level. The account name is not the product name or the nickname of the account.
             */
            Name?: string;
            /**
             * This is secondary identification of the account, as assigned by the account servicing institution.
             * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
             */
            SecondaryIdentification?: string;
          };
        };
      };
      /**
       * Tags to associate with the resource
       */
      Tags?: string[];
    }
    export interface CreateJobScheduleRequest {
      JobId: "REFRESH_PENDING_PAYMENTS" | "REFRESH_ACCOUNTS";
      Description?: string;
      /**
       * **Cron** expression that determines when the job should run. The supported format is described [here](https://github.com/harrisiirak/cron-parser)
       */
      ScheduleExpression: string;
    }
    export interface Data {
      /**
       * Unique identification as assigned to identify the account access consent resource.
       */
      ConsentId: string;
      /**
       * Date and time at which the resource was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
       * All date-time fields in responses must include the timezone. An example is below:
       * 2017-04-05T10:43:07+00:00
       */
      CreationDateTime: string; // date-time
      /**
       * Specifies the status of consent resource in code form.
       */
      Status: "Authorised" | "AwaitingAuthorisation" | "Rejected" | "Revoked";
      /**
       * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
       * All date-time fields in responses must include the timezone. An example is below:
       * 2017-04-05T10:43:07+00:00
       */
      StatusUpdateDateTime: string; // date-time
      Permissions: (
        | "ReadAccountsBasic"
        | "ReadAccountsDetail"
        | "ReadBalances"
        | "ReadBeneficiariesBasic"
        | "ReadBeneficiariesDetail"
        | "ReadDirectDebits"
        | "ReadOffers"
        | "ReadPAN"
        | "ReadParty"
        | "ReadPartyPSU"
        | "ReadProducts"
        | "ReadScheduledPaymentsBasic"
        | "ReadScheduledPaymentsDetail"
        | "ReadStandingOrdersBasic"
        | "ReadStandingOrdersDetail"
        | "ReadStatementsBasic"
        | "ReadStatementsDetail"
        | "ReadTransactionsBasic"
        | "ReadTransactionsCredits"
        | "ReadTransactionsDebits"
        | "ReadTransactionsDetail"
      )[];
      /**
       * Specified date and time the permissions will expire.
       * If this is not populated, the permissions will be open ended.All dates in the JSON payloads are represented in ISO 8601 date-time format.
       * All date-time fields in responses must include the timezone. An example is below:
       * 2017-04-05T10:43:07+00:00
       */
      ExpirationDateTime?: string; // date-time
      /**
       * Specified start date and time for the transaction query period.
       * If this is not populated, the start date will be open ended, and data will be returned from the earliest available transaction.All dates in the JSON payloads are represented in ISO 8601 date-time format.
       * All date-time fields in responses must include the timezone. An example is below:
       * 2017-04-05T10:43:07+00:00
       */
      TransactionFromDateTime?: string; // date-time
      /**
       * Specified end date and time for the transaction query period.
       * If this is not populated, the end date will be open ended, and data will be returned to the latest available transaction.All dates in the JSON payloads are represented in ISO 8601 date-time format.
       * All date-time fields in responses must include the timezone. An example is below:
       * 2017-04-05T10:43:07+00:00
       */
      TransactionToDateTime?: string; // date-time
    }
    export interface DomesticPaymentConsent {
      ConsentId: string;
      ConsentType: "DomesticPayment";
      Resource: {
        Data: {
          /**
           * OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource.
           */
          ConsentId: string;
          /**
           * Date and time at which the resource was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          CreationDateTime: string; // date-time
          /**
           * Specifies the status of consent resource in code form.
           */
          Status:
            | "Authorised"
            | "AwaitingAuthorisation"
            | "Consumed"
            | "Rejected";
          /**
           * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          StatusUpdateDateTime: string; // date-time
          /**
           * Specifies to share the refund account details with PISP
           */
          ReadRefundAccount?: "No" | "Yes";
          /**
           * Specified cut-off date and time for the payment consent.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          CutOffDateTime?: string; // date-time
          /**
           * Expected execution date and time for the payment resource.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          ExpectedExecutionDateTime?: string; // date-time
          /**
           * Expected settlement date and time for the payment resource.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          ExpectedSettlementDateTime?: string; // date-time
          Charges?: {
            /**
             * Specifies which party/parties will bear the charges associated with the processing of the payment transaction.
             */
            ChargeBearer:
              | "BorneByCreditor"
              | "BorneByDebtor"
              | "FollowingServiceLevel"
              | "Shared";
            /**
             * Charge type, in a coded form.
             */
            Type: string;
            /**
             * Amount of money associated with the charge type.
             */
            Amount: {
              /**
               * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
               */
              Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
              /**
               * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
               */
              Currency: string; // ^[A-Z]{3,3}$
            };
          }[];
          /**
           * The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single domestic payment.
           */
          Initiation: {
            /**
             * Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction.
             * Usage: the  instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction.
             */
            InstructionIdentification: string;
            /**
             * Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain.
             * Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction.
             * OB: The Faster Payments Scheme can only access 31 characters for the EndToEndIdentification field.
             */
            EndToEndIdentification: string;
            /**
             * User community specific instrument.
             * Usage: This element is used to specify a local instrument, local clearing option and/or further qualify the service or service level.
             */
            LocalInstrument?: string;
            /**
             * Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party.
             * Usage: This amount has to be transported unchanged through the transaction chain.
             */
            InstructedAmount: {
              /**
               * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
               */
              Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
              /**
               * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
               */
              Currency: string; // ^[A-Z]{3,3}$
            };
            /**
             * Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction.
             */
            DebtorAccount?: {
              /**
               * Name of the identification scheme, in a coded form as published in an external list.
               */
              SchemeName: string;
              /**
               * Identification assigned by an institution to identify an account. This identification is known by the account owner.
               */
              Identification: string;
              /**
               * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
               * Note, the account name is not the product name or the nickname of the account.
               */
              Name?: string;
              /**
               * This is secondary identification of the account, as assigned by the account servicing institution.
               * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
               */
              SecondaryIdentification?: string;
            };
            /**
             * Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction.
             */
            CreditorAccount: {
              /**
               * Name of the identification scheme, in a coded form as published in an external list.
               */
              SchemeName: string;
              /**
               * Identification assigned by an institution to identify an account. This identification is known by the account owner.
               */
              Identification: string;
              /**
               * The account name is the name or names of the account owner(s) represented at an account level.
               * Note, the account name is not the product name or the nickname of the account.
               * OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory.
               */
              Name: string;
              /**
               * This is secondary identification of the account, as assigned by the account servicing institution.
               * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
               */
              SecondaryIdentification?: string;
            };
            /**
             * Information that locates and identifies a specific address, as defined by postal services.
             */
            CreditorPostalAddress?: {
              /**
               * Identifies the nature of the postal address.
               */
              AddressType?:
                | "Business"
                | "Correspondence"
                | "DeliveryTo"
                | "MailTo"
                | "POBox"
                | "Postal"
                | "Residential"
                | "Statement";
              /**
               * Identification of a division of a large organisation or building.
               */
              Department?: string;
              /**
               * Identification of a sub-division of a large organisation or building.
               */
              SubDepartment?: string;
              /**
               * Name of a street or thoroughfare.
               */
              StreetName?: string;
              /**
               * Number that identifies the position of a building on a street.
               */
              BuildingNumber?: string;
              /**
               * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
               */
              PostCode?: string;
              /**
               * Name of a built-up area, with defined boundaries, and a local government.
               */
              TownName?: string;
              /**
               * Identifies a subdivision of a country such as state, region, county.
               */
              CountrySubDivision?: string;
              /**
               * Nation with its own government.
               */
              Country?: string; // ^[A-Z]{2,2}$
              AddressLine?: string[];
            };
            /**
             * Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system.
             */
            RemittanceInformation?: {
              /**
               * Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form.
               */
              Unstructured?: string;
              /**
               * Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction.
               * Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money.
               * If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification.
               * OB: The Faster Payments Scheme can only accept 18 characters for the ReferenceInformation field - which is where this ISO field will be mapped.
               */
              Reference?: string;
            };
            /**
             * Additional information that can not be captured in the structured fields and/or any other specific block.
             */
            SupplementaryData?: unknown;
          };
          /**
           * The authorisation type request from the TPP.
           */
          Authorisation?: {
            /**
             * Type of authorisation flow requested.
             */
            AuthorisationType: "Any" | "Single";
            /**
             * Date and time at which the requested authorisation flow must be completed.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            CompletionDateTime?: string; // date-time
          };
          /**
           * Supporting Data provided by TPP, when requesting SCA Exemption.
           */
          SCASupportData?: {
            /**
             * This field allows a PISP to request specific SCA Exemption for a Payment Initiation
             */
            RequestedSCAExemptionType?:
              | "BillPayment"
              | "ContactlessTravel"
              | "EcommerceGoods"
              | "EcommerceServices"
              | "Kiosk"
              | "Parking"
              | "PartyToParty";
            /**
             * Specifies a character string with a maximum length of 40 characters.
             * Usage: This field indicates whether the PSU was subject to SCA performed by the TPP
             */
            AppliedAuthenticationApproach?: "CA" | "SCA";
            /**
             * Specifies a character string with a maximum length of 140 characters.
             * Usage: If the payment is recurring then the transaction identifier of the previous payment occurrence so that the ASPSP can verify that the PISP, amount and the payee are the same as the previous occurrence.
             */
            ReferencePaymentOrderId?: string;
          };
          /**
           * Set of elements used to identify a person or an organisation.
           */
          Debtor?: {
            /**
             * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account.
             */
            Name?: string;
          };
        };
        /**
         * The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments.
         */
        Risk: {
          /**
           * Specifies the payment context
           */
          PaymentContextCode?:
            | "BillPayment"
            | "EcommerceGoods"
            | "EcommerceServices"
            | "Other"
            | "PartyToParty";
          /**
           * Category code conform to ISO 18245, related to the type of services or goods the merchant provides for the transaction.
           */
          MerchantCategoryCode?: string;
          /**
           * The unique customer identifier of the PSU with the merchant.
           */
          MerchantCustomerIdentification?: string;
          /**
           * Information that locates and identifies a specific address, as defined by postal services or in free format text.
           */
          DeliveryAddress?: {
            AddressLine?: string[];
            /**
             * Name of a street or thoroughfare.
             */
            StreetName?: string;
            /**
             * Number that identifies the position of a building on a street.
             */
            BuildingNumber?: string;
            /**
             * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
             */
            PostCode?: string;
            /**
             * Name of a built-up area, with defined boundaries, and a local government.
             */
            TownName: string;
            /**
             * Identifies a subdivision of a country such as state, region, county.
             */
            CountrySubDivision?: string;
            /**
             * Nation with its own government, occupying a particular territory.
             */
            Country: string; // ^[A-Z]{2,2}$
          };
        };
      };
      Partnership?: {
        PartnershipId: string;
        CustomerFriendlyName: string;
        CustomerFriendlyLogoUri?: string;
      };
      /**
       * Tags associated with the resource
       */
      Tags?: string[];
    }
    export interface Error {
      message?: string;
    }
    export interface ExecuteFundsConfirmationRequest {
      Resource: {
        Data: {
          /**
           * Unique reference, as assigned by the CBPII, to unambiguously refer to the request related to the payment transaction.
           */
          Reference: string;
          /**
           * Amount of money to be confirmed as available funds in the debtor account. Contains an Amount and a Currency.
           */
          InstructedAmount: {
            /**
             * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
             */
            Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
            /**
             * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
             */
            Currency: string; // ^[A-Z]{3,3}$
          };
        };
      };
    }
    export interface ExecuteFundsConfirmationResponse {
      Resource: {
        Data: {
          /**
           * Unique identification as assigned by the ASPSP to uniquely identify the funds confirmation resource.
           */
          FundsConfirmationId: string;
          /**
           * Unique identification as assigned by the ASPSP to uniquely identify the funds confirmation consent resource.
           */
          ConsentId: string;
          /**
           * Date and time at which the resource was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          CreationDateTime: string; // date-time
          /**
           * Flag to indicate the result of a confirmation of funds check.
           */
          FundsAvailable: boolean;
          /**
           * Unique reference, as assigned by the CBPII, to unambiguously refer to the request related to the payment transaction.
           */
          Reference: string;
          /**
           * Amount of money to be confirmed as available funds in the debtor account. Contains an Amount and a Currency.
           */
          InstructedAmount: {
            /**
             * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
             */
            Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
            /**
             * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
             */
            Currency: string; // ^[A-Z]{3,3}$
          };
        };
      };
    }
    export type ExecutionLog = string[];
    export interface FundsConfirmationConsent {
      ConsentId: string;
      ConsentType: "FundsConfirmation";
      Partnership: {
        PartnershipId: string;
        CustomerFriendlyName: string;
        CustomerFriendlyLogoUri?: string;
      };
      Resource: {
        Data: {
          /**
           * Unique identification as assigned to identify the funds confirmation consent resource.
           */
          ConsentId: string;
          /**
           * Date and time at which the resource was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          CreationDateTime: string; // date-time
          /**
           * Specifies the status of consent resource in code form.
           */
          Status:
            | "Authorised"
            | "AwaitingAuthorisation"
            | "Rejected"
            | "Revoked";
          /**
           * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          StatusUpdateDateTime: string; // date-time
          /**
           * Specified date and time the funds confirmation authorisation will expire.
           * If this is not populated, the authorisation will be open ended.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          ExpirationDateTime?: string; // date-time
          /**
           * Unambiguous identification of the account of the debtor to which a confirmation of funds consent will be applied.
           */
          DebtorAccount: {
            /**
             * Name of the identification scheme, in a coded form as published in an external list.
             */
            SchemeName: string;
            /**
             * Identification assigned by an institution to identify an account. This identification is known by the account owner.
             */
            Identification: string;
            /**
             * Name of the account, as assigned by the account servicing institution.
             * Usage: The account name is the name or names of the account owner(s) represented at an account level. The account name is not the product name or the nickname of the account.
             */
            Name?: string;
            /**
             * This is secondary identification of the account, as assigned by the account servicing institution.
             * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
             */
            SecondaryIdentification?: string;
          };
        };
      };
      /**
       * Tags associated with the resource
       */
      Tags?: string[];
    }
    export interface FundsConfirmationConsentInputResource {
      Data: {
        /**
         * Specified date and time the funds confirmation authorisation will expire.
         *  If this is not populated, the authorisation will be open ended.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        ExpirationDateTime?: string; // date-time
        /**
         * Unambiguous identification of the account of the debtor to which a confirmation of funds consent will be applied.
         */
        DebtorAccount: {
          /**
           * Name of the identification scheme, in a coded form as published in an external list.
           */
          SchemeName: string;
          /**
           * Identification assigned by an institution to identify an account. This identification is known by the account owner.
           */
          Identification: string;
          /**
           * Name of the account, as assigned by the account servicing institution.
           * Usage: The account name is the name or names of the account owner(s) represented at an account level. The account name is not the product name or the nickname of the account.
           */
          Name?: string;
          /**
           * This is secondary identification of the account, as assigned by the account servicing institution.
           * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
           */
          SecondaryIdentification?: string;
        };
      };
    }
    export interface FundsConfirmationConsentResource {
      Data: {
        /**
         * Unique identification as assigned to identify the funds confirmation consent resource.
         */
        ConsentId: string;
        /**
         * Date and time at which the resource was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        CreationDateTime: string; // date-time
        /**
         * Specifies the status of consent resource in code form.
         */
        Status: "Authorised" | "AwaitingAuthorisation" | "Rejected" | "Revoked";
        /**
         * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        StatusUpdateDateTime: string; // date-time
        /**
         * Specified date and time the funds confirmation authorisation will expire.
         * If this is not populated, the authorisation will be open ended.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        ExpirationDateTime?: string; // date-time
        /**
         * Unambiguous identification of the account of the debtor to which a confirmation of funds consent will be applied.
         */
        DebtorAccount: {
          /**
           * Name of the identification scheme, in a coded form as published in an external list.
           */
          SchemeName: string;
          /**
           * Identification assigned by an institution to identify an account. This identification is known by the account owner.
           */
          Identification: string;
          /**
           * Name of the account, as assigned by the account servicing institution.
           * Usage: The account name is the name or names of the account owner(s) represented at an account level. The account name is not the product name or the nickname of the account.
           */
          Name?: string;
          /**
           * This is secondary identification of the account, as assigned by the account servicing institution.
           * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
           */
          SecondaryIdentification?: string;
        };
      };
    }
    export interface FundsConfirmationInputResource {
      Data: {
        /**
         * Unique reference, as assigned by the CBPII, to unambiguously refer to the request related to the payment transaction.
         */
        Reference: string;
        /**
         * Amount of money to be confirmed as available funds in the debtor account. Contains an Amount and a Currency.
         */
        InstructedAmount: {
          /**
           * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
           */
          Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
          /**
           * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
           */
          Currency: string; // ^[A-Z]{3,3}$
        };
      };
    }
    export interface FundsConfirmationResource {
      Data: {
        /**
         * Unique identification as assigned by the ASPSP to uniquely identify the funds confirmation resource.
         */
        FundsConfirmationId: string;
        /**
         * Unique identification as assigned by the ASPSP to uniquely identify the funds confirmation consent resource.
         */
        ConsentId: string;
        /**
         * Date and time at which the resource was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        CreationDateTime: string; // date-time
        /**
         * Flag to indicate the result of a confirmation of funds check.
         */
        FundsAvailable: boolean;
        /**
         * Unique reference, as assigned by the CBPII, to unambiguously refer to the request related to the payment transaction.
         */
        Reference: string;
        /**
         * Amount of money to be confirmed as available funds in the debtor account. Contains an Amount and a Currency.
         */
        InstructedAmount: {
          /**
           * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
           */
          Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
          /**
           * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
           */
          Currency: string; // ^[A-Z]{3,3}$
        };
      };
    }
    export interface GetAccountAccessConsentsResponse {
      Items: {
        ConsentId: string;
        ConsentType: "AccountAccess";
        Partnership?: {
          PartnershipId: string;
          CustomerFriendlyName: string;
          CustomerFriendlyLogoUri?: string;
        };
        Resource: {
          Data: {
            /**
             * Unique identification as assigned to identify the account access consent resource.
             */
            ConsentId: string;
            /**
             * Date and time at which the resource was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            CreationDateTime: string; // date-time
            /**
             * Specifies the status of consent resource in code form.
             */
            Status:
              | "Authorised"
              | "AwaitingAuthorisation"
              | "Rejected"
              | "Revoked";
            /**
             * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            StatusUpdateDateTime: string; // date-time
            Permissions: (
              | "ReadAccountsBasic"
              | "ReadAccountsDetail"
              | "ReadBalances"
              | "ReadBeneficiariesBasic"
              | "ReadBeneficiariesDetail"
              | "ReadDirectDebits"
              | "ReadOffers"
              | "ReadPAN"
              | "ReadParty"
              | "ReadPartyPSU"
              | "ReadProducts"
              | "ReadScheduledPaymentsBasic"
              | "ReadScheduledPaymentsDetail"
              | "ReadStandingOrdersBasic"
              | "ReadStandingOrdersDetail"
              | "ReadStatementsBasic"
              | "ReadStatementsDetail"
              | "ReadTransactionsBasic"
              | "ReadTransactionsCredits"
              | "ReadTransactionsDebits"
              | "ReadTransactionsDetail"
            )[];
            /**
             * Specified date and time the permissions will expire.
             * If this is not populated, the permissions will be open ended.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            ExpirationDateTime?: string; // date-time
            /**
             * Specified start date and time for the transaction query period.
             * If this is not populated, the start date will be open ended, and data will be returned from the earliest available transaction.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            TransactionFromDateTime?: string; // date-time
            /**
             * Specified end date and time for the transaction query period.
             * If this is not populated, the end date will be open ended, and data will be returned to the latest available transaction.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            TransactionToDateTime?: string; // date-time
          };
          /**
           * The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Account Info.
           */
          Risk: unknown;
        };
        /**
         * Tags associated with the resource
         */
        Tags?: string[];
      }[];
      /**
       * Information about the results
       */
      Meta: {
        /**
         * Maximum number of results return in a single request
         */
        PageSize: number;
        /**
         * Number of the previous page. If empty, means the current page is the first one
         */
        PreviousPage?: number;
        /**
         * Number of the next page. If empty, means the current page is the last one
         */
        NextPage?: number;
        /**
         * Total number of pages found
         */
        PageCount: number;
        /**
         * Total number of items found
         */
        ItemCount: number;
      };
      Links: {
        Self: string;
        Next?: string;
        Prev?: string;
      };
    }
    export interface GetAccountBalanceResponse {
      Items: {
        /**
         * Set of elements used to define the balance details.
         */
        Resource: {
          /**
           * A unique and immutable identifier used to identify the account resource. This identifier has no meaning to the account owner.
           */
          AccountId: string;
          /**
           * Indicates whether the balance is a credit or a debit balance.
           * Usage: A zero balance is considered to be a credit balance.
           */
          CreditDebitIndicator: "Credit" | "Debit";
          /**
           * Balance type, in a coded form.
           */
          Type:
            | "ClosingAvailable"
            | "ClosingBooked"
            | "ClosingCleared"
            | "Expected"
            | "ForwardAvailable"
            | "Information"
            | "InterimAvailable"
            | "InterimBooked"
            | "InterimCleared"
            | "OpeningAvailable"
            | "OpeningBooked"
            | "OpeningCleared"
            | "PreviouslyClosedBooked";
          /**
           * Indicates the date (and time) of the balance.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          DateTime: string; // date-time
          /**
           * Amount of money of the cash balance.
           */
          Amount: {
            /**
             * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
             */
            Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
            /**
             * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
             */
            Currency: string; // ^[A-Z]{3,3}$
          };
          CreditLine?: {
            /**
             * Indicates whether or not the credit line is included in the balance of the account.
             * Usage: If not present, credit line is not included in the balance amount of the account.
             */
            Included: boolean;
            /**
             * Limit type, in a coded form.
             */
            Type?:
              | "Available"
              | "Credit"
              | "Emergency"
              | "Pre-Agreed"
              | "Temporary";
            /**
             * Amount of money of the credit line.
             */
            Amount?: {
              /**
               * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
               */
              Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
              /**
               * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
               */
              Currency: string; // ^[A-Z]{3,3}$
            };
          }[];
        };
      }[];
      /**
       * Information about the results
       */
      Meta: {
        /**
         * Maximum number of results return in a single request
         */
        PageSize: number;
        /**
         * Number of the previous page. If empty, means the current page is the first one
         */
        PreviousPage?: number;
        /**
         * Number of the next page. If empty, means the current page is the last one
         */
        NextPage?: number;
        /**
         * Total number of pages found
         */
        PageCount: number;
        /**
         * Total number of items found
         */
        ItemCount: number;
      };
      Links: {
        Self: string;
        Next?: string;
        Prev?: string;
      };
    }
    export interface GetAccountTransactionsResponse {
      Items: {
        /**
         * Provides further details on an entry in the report.
         */
        Resource: {
          /**
           * A unique and immutable identifier used to identify the account resource. This identifier has no meaning to the account owner.
           */
          AccountId: string;
          /**
           * Unique identifier for the transaction within an servicing institution. This identifier is both unique and immutable.
           */
          TransactionId?: string;
          /**
           * Unique reference for the transaction. This reference is optionally populated, and may as an example be the FPID in the Faster Payments context.
           */
          TransactionReference?: string;
          StatementReference?: string[];
          /**
           * Indicates whether the transaction is a credit or a debit entry.
           */
          CreditDebitIndicator: "Credit" | "Debit";
          /**
           * Status of a transaction entry on the books of the account servicer.
           */
          Status: "Booked" | "Pending";
          /**
           * Specifies the Mutability of the Transaction record.
           */
          TransactionMutability?: "Mutable" | "Immutable";
          /**
           * Date and time when a transaction entry is posted to an account on the account servicer's books.
           * Usage: Booking date is the expected booking date, unless the status is booked, in which case it is the actual booking date.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          BookingDateTime: string; // date-time
          /**
           * Date and time at which assets become available to the account owner in case of a credit entry, or cease to be available to the account owner in case of a debit transaction entry.
           * Usage: If transaction entry status is pending and value date is present, then the value date refers to an expected/requested value date.
           * For transaction entries subject to availability/float and for which availability information is provided, the value date must not be used. In this case the availability component identifies the number of availability days.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          ValueDateTime?: string; // date-time
          /**
           * Further details of the transaction.
           * This is the transaction narrative, which is unstructured text.
           */
          TransactionInformation?: string;
          /**
           * Information that locates and identifies a specific address for a transaction entry, that is presented in free format text.
           */
          AddressLine?: string;
          /**
           * Amount of money in the cash transaction entry.
           */
          Amount: {
            /**
             * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
             */
            Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
            /**
             * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
             */
            Currency: string; // ^[A-Z]{3,3}$
          };
          /**
           * Transaction charges to be paid by the charge bearer.
           */
          ChargeAmount?: {
            /**
             * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
             */
            Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
            /**
             * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
             */
            Currency: string; // ^[A-Z]{3,3}$
          };
          /**
           * Set of elements used to provide details on the currency exchange.
           */
          CurrencyExchange?: {
            /**
             * Currency from which an amount is to be converted in a currency conversion.
             */
            SourceCurrency: string; // ^[A-Z]{3,3}$
            /**
             * Currency into which an amount is to be converted in a currency conversion.
             */
            TargetCurrency?: string; // ^[A-Z]{3,3}$
            /**
             * Currency in which the rate of exchange is expressed in a currency exchange. In the example 1GBP = xxxCUR, the unit currency is GBP.
             */
            UnitCurrency?: string; // ^[A-Z]{3,3}$
            /**
             * Factor used to convert an amount from one currency into another. This reflects the price at which one currency was bought with another currency.
             * Usage: ExchangeRate expresses the ratio between UnitCurrency and QuotedCurrency (ExchangeRate = UnitCurrency/QuotedCurrency).
             */
            ExchangeRate: number;
            /**
             * Unique identification to unambiguously identify the foreign exchange contract.
             */
            ContractIdentification?: string;
            /**
             * Date and time at which an exchange rate is quoted.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            QuotationDate?: string; // date-time
            /**
             * Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party.
             */
            InstructedAmount?: {
              /**
               * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
               */
              Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
              /**
               * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
               */
              Currency: string; // ^[A-Z]{3,3}$
            };
          };
          /**
           * Set of elements used to fully identify the type of underlying transaction resulting in an entry.
           */
          BankTransactionCode?: {
            /**
             * Specifies the family within a domain.
             */
            Code: string;
            /**
             * Specifies the sub-product family within a specific family.
             */
            SubCode: string;
          };
          /**
           * Set of elements to fully identify a proprietary bank transaction code.
           */
          ProprietaryBankTransactionCode?: {
            /**
             * Proprietary bank transaction code to identify the underlying transaction.
             */
            Code: string;
            /**
             * Identification of the issuer of the proprietary bank transaction code.
             */
            Issuer?: string;
          };
          /**
           * Set of elements used to define the balance as a numerical representation of the net increases and decreases in an account after a transaction entry is applied to the account.
           */
          Balance?: {
            /**
             * Indicates whether the balance is a credit or a debit balance.
             * Usage: A zero balance is considered to be a credit balance.
             */
            CreditDebitIndicator: "Credit" | "Debit";
            /**
             * Balance type, in a coded form.
             */
            Type:
              | "ClosingAvailable"
              | "ClosingBooked"
              | "ClosingCleared"
              | "Expected"
              | "ForwardAvailable"
              | "Information"
              | "InterimAvailable"
              | "InterimBooked"
              | "InterimCleared"
              | "OpeningAvailable"
              | "OpeningBooked"
              | "OpeningCleared"
              | "PreviouslyClosedBooked";
            /**
             * Amount of money of the cash balance after a transaction entry is applied to the account..
             */
            Amount: {
              /**
               * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
               */
              Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
              /**
               * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
               */
              Currency: string; // ^[A-Z]{3,3}$
            };
          };
          /**
           * Details of the merchant involved in the transaction.
           */
          MerchantDetails?: {
            /**
             * Name by which the merchant is known.
             */
            MerchantName?: string;
            /**
             * Category code conform to ISO 18245, related to the type of services or goods the merchant provides for the transaction.
             */
            MerchantCategoryCode?: string;
          };
          /**
           * Financial institution servicing an account for the creditor.
           */
          CreditorAgent?: {
            /**
             * Name of the identification scheme, in a coded form as published in an external list.
             */
            SchemeName?: string;
            /**
             * Unique and unambiguous identification of a financial institution or a branch of a financial institution.
             */
            Identification?: string;
            /**
             * Name by which an agent is known and which is usually used to identify that agent.
             */
            Name?: string;
            /**
             * Information that locates and identifies a specific address, as defined by postal services.
             */
            PostalAddress?: {
              /**
               * Identifies the nature of the postal address.
               */
              AddressType?:
                | "Business"
                | "Correspondence"
                | "DeliveryTo"
                | "MailTo"
                | "POBox"
                | "Postal"
                | "Residential"
                | "Statement";
              /**
               * Identification of a division of a large organisation or building.
               */
              Department?: string;
              /**
               * Identification of a sub-division of a large organisation or building.
               */
              SubDepartment?: string;
              /**
               * Name of a street or thoroughfare.
               */
              StreetName?: string;
              /**
               * Number that identifies the position of a building on a street.
               */
              BuildingNumber?: string;
              /**
               * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
               */
              PostCode?: string;
              /**
               * Name of a built-up area, with defined boundaries, and a local government.
               */
              TownName?: string;
              /**
               * Identifies a subdivision of a country such as state, region, county.
               */
              CountrySubDivision?: string;
              /**
               * Nation with its own government.
               */
              Country?: string; // ^[A-Z]{2,2}$
              AddressLine?: string[];
            };
          };
          /**
           * Unambiguous identification of the account of the creditor, in the case of a debit transaction.
           */
          CreditorAccount?: {
            /**
             * Name of the identification scheme, in a coded form as published in an external list.
             */
            SchemeName?: string;
            /**
             * Identification assigned by an institution to identify an account. This identification is known by the account owner.
             */
            Identification?: string;
            /**
             * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
             * Note, the account name is not the product name or the nickname of the account.
             */
            Name?: string;
            /**
             * This is secondary identification of the account, as assigned by the account servicing institution.
             * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
             */
            SecondaryIdentification?: string;
          };
          /**
           * Financial institution servicing an account for the debtor.
           */
          DebtorAgent?: {
            /**
             * Name of the identification scheme, in a coded form as published in an external list.
             */
            SchemeName?: string;
            /**
             * Unique and unambiguous identification of a financial institution or a branch of a financial institution.
             */
            Identification?: string;
            /**
             * Name by which an agent is known and which is usually used to identify that agent.
             */
            Name?: string;
            /**
             * Information that locates and identifies a specific address, as defined by postal services.
             */
            PostalAddress?: {
              /**
               * Identifies the nature of the postal address.
               */
              AddressType?:
                | "Business"
                | "Correspondence"
                | "DeliveryTo"
                | "MailTo"
                | "POBox"
                | "Postal"
                | "Residential"
                | "Statement";
              /**
               * Identification of a division of a large organisation or building.
               */
              Department?: string;
              /**
               * Identification of a sub-division of a large organisation or building.
               */
              SubDepartment?: string;
              /**
               * Name of a street or thoroughfare.
               */
              StreetName?: string;
              /**
               * Number that identifies the position of a building on a street.
               */
              BuildingNumber?: string;
              /**
               * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
               */
              PostCode?: string;
              /**
               * Name of a built-up area, with defined boundaries, and a local government.
               */
              TownName?: string;
              /**
               * Identifies a subdivision of a country such as state, region, county.
               */
              CountrySubDivision?: string;
              /**
               * Nation with its own government.
               */
              Country?: string; // ^[A-Z]{2,2}$
              AddressLine?: string[];
            };
          };
          /**
           * Unambiguous identification of the account of the debtor, in the case of a crebit transaction.
           */
          DebtorAccount?: {
            /**
             * Name of the identification scheme, in a coded form as published in an external list.
             */
            SchemeName?: string;
            /**
             * Identification assigned by an institution to identify an account. This identification is known by the account owner.
             */
            Identification?: string;
            /**
             * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
             * Note, the account name is not the product name or the nickname of the account.
             */
            Name?: string;
            /**
             * This is secondary identification of the account, as assigned by the account servicing institution.
             * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
             */
            SecondaryIdentification?: string;
          };
          /**
           * Set of elements to describe the card instrument used in the transaction.
           */
          CardInstrument?: {
            /**
             * Name of the card scheme.
             */
            CardSchemeName:
              | "AmericanExpress"
              | "Diners"
              | "Discover"
              | "MasterCard"
              | "VISA";
            /**
             * The card authorisation type.
             */
            AuthorisationType?:
              | "ConsumerDevice"
              | "Contactless"
              | "None"
              | "PIN";
            /**
             * Name of the cardholder using the card instrument.
             */
            Name?: string;
            /**
             * Identification assigned by an institution to identify the card instrument used in the transaction. This identification is known by the account owner, and may be masked.
             */
            Identification?: string;
          };
          /**
           * Additional information that can not be captured in the structured fields and/or any other specific block.
           */
          SupplementaryData?: unknown;
        };
      }[];
      /**
       * Information about the results
       */
      Meta: {
        /**
         * Maximum number of results return in a single request
         */
        PageSize: number;
        /**
         * Number of the previous page. If empty, means the current page is the first one
         */
        PreviousPage?: number;
        /**
         * Number of the next page. If empty, means the current page is the last one
         */
        NextPage?: number;
        /**
         * Total number of pages found
         */
        PageCount: number;
        /**
         * Total number of items found
         */
        ItemCount: number;
      };
      Links: {
        Self: string;
        Next?: string;
        Prev?: string;
      };
    }
    export interface GetAccountsResponse {
      Items: {
        AccountId: string;
        Resource: {
          /**
           * Unambiguous identification of the account to which credit and debit entries are made.
           */
          Data: {
            /**
             * A unique and immutable identifier used to identify the account resource. This identifier has no meaning to the account owner.
             */
            AccountId: string;
            /**
             * Specifies the status of account resource in code form.
             */
            Status?:
              | "Deleted"
              | "Disabled"
              | "Enabled"
              | "Pending"
              | "ProForma";
            /**
             * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            StatusUpdateDateTime?: string; // date-time
            /**
             * Identification of the currency in which the account is held.
             * Usage: Currency should only be used in case one and the same account number covers several currencies
             * and the initiating party needs to identify which currency needs to be used for settlement on the account.
             */
            Currency: string; // ^[A-Z]{3,3}$
            /**
             * Specifies the type of account (personal or business).
             */
            AccountType: "Business" | "Personal";
            /**
             * Specifies the sub type of account (product family group).
             */
            AccountSubType:
              | "ChargeCard"
              | "CreditCard"
              | "CurrentAccount"
              | "EMoney"
              | "Loan"
              | "Mortgage"
              | "PrePaidCard"
              | "Savings";
            /**
             * Specifies the description of the account type.
             */
            Description?: string;
            /**
             * The nickname of the account, assigned by the account owner in order to provide an additional means of identification of the account.
             */
            Nickname?: string;
            /**
             * Date on which the account and related basic services are effectively operational for the account owner.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            OpeningDate?: string; // date-time
            /**
             * Maturity date of the account.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            MaturityDate?: string; // date-time
            /**
             * Specifies the switch status for the account, in a coded form.
             */
            SwitchStatus?: string;
            Account?: {
              /**
               * Name of the identification scheme, in a coded form as published in an external list.
               */
              SchemeName: string;
              /**
               * Identification assigned by an institution to identify an account. This identification is known by the account owner.
               */
              Identification: string;
              /**
               * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
               * Note, the account name is not the product name or the nickname of the account.
               */
              Name?: string;
              /**
               * This is secondary identification of the account, as assigned by the account servicing institution.
               * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
               */
              SecondaryIdentification?: string;
            }[];
            /**
             * Party that manages the account on behalf of the account owner, that is manages the registration and booking of entries on the account, calculates balances on the account and provides information about the account.
             */
            Servicer?: {
              /**
               * Name of the identification scheme, in a coded form as published in an external list.
               */
              SchemeName: string;
              /**
               * Unique and unambiguous identification of the servicing institution.
               */
              Identification: string;
            };
          };
        };
        Partnership: {
          PartnershipId: string;
          CustomerFriendlyName: string;
          CustomerFriendlyLogoUri?: string;
        };
        /**
         * Tags associated with the resource
         */
        Tags?: string[];
      }[];
      /**
       * Information about the results
       */
      Meta: {
        /**
         * Maximum number of results return in a single request
         */
        PageSize: number;
        /**
         * Number of the previous page. If empty, means the current page is the first one
         */
        PreviousPage?: number;
        /**
         * Number of the next page. If empty, means the current page is the last one
         */
        NextPage?: number;
        /**
         * Total number of pages found
         */
        PageCount: number;
        /**
         * Total number of items found
         */
        ItemCount: number;
      };
      Links: {
        Self: string;
        Next?: string;
        Prev?: string;
      };
    }
    export interface GetDomesticPaymentConsentsResponse {
      Items: {
        ConsentId: string;
        ConsentType: "DomesticPayment";
        Resource: {
          Data: {
            /**
             * OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource.
             */
            ConsentId: string;
            /**
             * Date and time at which the resource was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            CreationDateTime: string; // date-time
            /**
             * Specifies the status of consent resource in code form.
             */
            Status:
              | "Authorised"
              | "AwaitingAuthorisation"
              | "Consumed"
              | "Rejected";
            /**
             * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            StatusUpdateDateTime: string; // date-time
            /**
             * Specifies to share the refund account details with PISP
             */
            ReadRefundAccount?: "No" | "Yes";
            /**
             * Specified cut-off date and time for the payment consent.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            CutOffDateTime?: string; // date-time
            /**
             * Expected execution date and time for the payment resource.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            ExpectedExecutionDateTime?: string; // date-time
            /**
             * Expected settlement date and time for the payment resource.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            ExpectedSettlementDateTime?: string; // date-time
            Charges?: {
              /**
               * Specifies which party/parties will bear the charges associated with the processing of the payment transaction.
               */
              ChargeBearer:
                | "BorneByCreditor"
                | "BorneByDebtor"
                | "FollowingServiceLevel"
                | "Shared";
              /**
               * Charge type, in a coded form.
               */
              Type: string;
              /**
               * Amount of money associated with the charge type.
               */
              Amount: {
                /**
                 * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
                 */
                Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
                /**
                 * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
                 */
                Currency: string; // ^[A-Z]{3,3}$
              };
            }[];
            /**
             * The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single domestic payment.
             */
            Initiation: {
              /**
               * Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction.
               * Usage: the  instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction.
               */
              InstructionIdentification: string;
              /**
               * Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain.
               * Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction.
               * OB: The Faster Payments Scheme can only access 31 characters for the EndToEndIdentification field.
               */
              EndToEndIdentification: string;
              /**
               * User community specific instrument.
               * Usage: This element is used to specify a local instrument, local clearing option and/or further qualify the service or service level.
               */
              LocalInstrument?: string;
              /**
               * Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party.
               * Usage: This amount has to be transported unchanged through the transaction chain.
               */
              InstructedAmount: {
                /**
                 * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
                 */
                Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
                /**
                 * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
                 */
                Currency: string; // ^[A-Z]{3,3}$
              };
              /**
               * Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction.
               */
              DebtorAccount?: {
                /**
                 * Name of the identification scheme, in a coded form as published in an external list.
                 */
                SchemeName: string;
                /**
                 * Identification assigned by an institution to identify an account. This identification is known by the account owner.
                 */
                Identification: string;
                /**
                 * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
                 * Note, the account name is not the product name or the nickname of the account.
                 */
                Name?: string;
                /**
                 * This is secondary identification of the account, as assigned by the account servicing institution.
                 * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
                 */
                SecondaryIdentification?: string;
              };
              /**
               * Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction.
               */
              CreditorAccount: {
                /**
                 * Name of the identification scheme, in a coded form as published in an external list.
                 */
                SchemeName: string;
                /**
                 * Identification assigned by an institution to identify an account. This identification is known by the account owner.
                 */
                Identification: string;
                /**
                 * The account name is the name or names of the account owner(s) represented at an account level.
                 * Note, the account name is not the product name or the nickname of the account.
                 * OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory.
                 */
                Name: string;
                /**
                 * This is secondary identification of the account, as assigned by the account servicing institution.
                 * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
                 */
                SecondaryIdentification?: string;
              };
              /**
               * Information that locates and identifies a specific address, as defined by postal services.
               */
              CreditorPostalAddress?: {
                /**
                 * Identifies the nature of the postal address.
                 */
                AddressType?:
                  | "Business"
                  | "Correspondence"
                  | "DeliveryTo"
                  | "MailTo"
                  | "POBox"
                  | "Postal"
                  | "Residential"
                  | "Statement";
                /**
                 * Identification of a division of a large organisation or building.
                 */
                Department?: string;
                /**
                 * Identification of a sub-division of a large organisation or building.
                 */
                SubDepartment?: string;
                /**
                 * Name of a street or thoroughfare.
                 */
                StreetName?: string;
                /**
                 * Number that identifies the position of a building on a street.
                 */
                BuildingNumber?: string;
                /**
                 * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
                 */
                PostCode?: string;
                /**
                 * Name of a built-up area, with defined boundaries, and a local government.
                 */
                TownName?: string;
                /**
                 * Identifies a subdivision of a country such as state, region, county.
                 */
                CountrySubDivision?: string;
                /**
                 * Nation with its own government.
                 */
                Country?: string; // ^[A-Z]{2,2}$
                AddressLine?: string[];
              };
              /**
               * Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system.
               */
              RemittanceInformation?: {
                /**
                 * Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form.
                 */
                Unstructured?: string;
                /**
                 * Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction.
                 * Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money.
                 * If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification.
                 * OB: The Faster Payments Scheme can only accept 18 characters for the ReferenceInformation field - which is where this ISO field will be mapped.
                 */
                Reference?: string;
              };
              /**
               * Additional information that can not be captured in the structured fields and/or any other specific block.
               */
              SupplementaryData?: unknown;
            };
            /**
             * The authorisation type request from the TPP.
             */
            Authorisation?: {
              /**
               * Type of authorisation flow requested.
               */
              AuthorisationType: "Any" | "Single";
              /**
               * Date and time at which the requested authorisation flow must be completed.All dates in the JSON payloads are represented in ISO 8601 date-time format.
               * All date-time fields in responses must include the timezone. An example is below:
               * 2017-04-05T10:43:07+00:00
               */
              CompletionDateTime?: string; // date-time
            };
            /**
             * Supporting Data provided by TPP, when requesting SCA Exemption.
             */
            SCASupportData?: {
              /**
               * This field allows a PISP to request specific SCA Exemption for a Payment Initiation
               */
              RequestedSCAExemptionType?:
                | "BillPayment"
                | "ContactlessTravel"
                | "EcommerceGoods"
                | "EcommerceServices"
                | "Kiosk"
                | "Parking"
                | "PartyToParty";
              /**
               * Specifies a character string with a maximum length of 40 characters.
               * Usage: This field indicates whether the PSU was subject to SCA performed by the TPP
               */
              AppliedAuthenticationApproach?: "CA" | "SCA";
              /**
               * Specifies a character string with a maximum length of 140 characters.
               * Usage: If the payment is recurring then the transaction identifier of the previous payment occurrence so that the ASPSP can verify that the PISP, amount and the payee are the same as the previous occurrence.
               */
              ReferencePaymentOrderId?: string;
            };
            /**
             * Set of elements used to identify a person or an organisation.
             */
            Debtor?: {
              /**
               * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account.
               */
              Name?: string;
            };
          };
          /**
           * The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments.
           */
          Risk: {
            /**
             * Specifies the payment context
             */
            PaymentContextCode?:
              | "BillPayment"
              | "EcommerceGoods"
              | "EcommerceServices"
              | "Other"
              | "PartyToParty";
            /**
             * Category code conform to ISO 18245, related to the type of services or goods the merchant provides for the transaction.
             */
            MerchantCategoryCode?: string;
            /**
             * The unique customer identifier of the PSU with the merchant.
             */
            MerchantCustomerIdentification?: string;
            /**
             * Information that locates and identifies a specific address, as defined by postal services or in free format text.
             */
            DeliveryAddress?: {
              AddressLine?: string[];
              /**
               * Name of a street or thoroughfare.
               */
              StreetName?: string;
              /**
               * Number that identifies the position of a building on a street.
               */
              BuildingNumber?: string;
              /**
               * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
               */
              PostCode?: string;
              /**
               * Name of a built-up area, with defined boundaries, and a local government.
               */
              TownName: string;
              /**
               * Identifies a subdivision of a country such as state, region, county.
               */
              CountrySubDivision?: string;
              /**
               * Nation with its own government, occupying a particular territory.
               */
              Country: string; // ^[A-Z]{2,2}$
            };
          };
        };
        Partnership?: {
          PartnershipId: string;
          CustomerFriendlyName: string;
          CustomerFriendlyLogoUri?: string;
        };
        /**
         * Tags associated with the resource
         */
        Tags?: string[];
      }[];
      /**
       * Information about the results
       */
      Meta: {
        /**
         * Maximum number of results return in a single request
         */
        PageSize: number;
        /**
         * Number of the previous page. If empty, means the current page is the first one
         */
        PreviousPage?: number;
        /**
         * Number of the next page. If empty, means the current page is the last one
         */
        NextPage?: number;
        /**
         * Total number of pages found
         */
        PageCount: number;
        /**
         * Total number of items found
         */
        ItemCount: number;
      };
      Links: {
        Self: string;
        Next?: string;
        Prev?: string;
      };
    }
    export interface GetDomesticPaymentFundsConfirmationResponse {
      Resource: {
        Data: {
          /**
           * Result of a funds availability check.
           */
          FundsAvailableResult?: {
            /**
             * Date and time at which the funds availability check was generated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            FundsAvailableDateTime: string; // date-time
            /**
             * Flag to indicate the availability of funds given the Amount in the consent request.
             */
            FundsAvailable: boolean;
          };
          /**
           * Additional information that can not be captured in the structured fields and/or any other specific block.
           */
          SupplementaryData?: unknown;
        };
      };
    }
    export interface GetDomesticPaymentsResponse {
      Items: {
        PaymentId: string;
        PaymentType: "DomesticPayment";
        Resource: {
          Data: {
            /**
             * OB: Unique identification as assigned by the ASPSP to uniquely identify the domestic payment resource.
             */
            DomesticPaymentId: string;
            /**
             * OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource.
             */
            ConsentId: string;
            /**
             * Date and time at which the message was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            CreationDateTime: string; // date-time
            /**
             * Specifies the status of the payment information group.
             */
            Status:
              | "AcceptedCreditSettlementCompleted"
              | "AcceptedSettlementCompleted"
              | "AcceptedSettlementInProcess"
              | "AcceptedWithoutPosting"
              | "Pending"
              | "Rejected";
            /**
             * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            StatusUpdateDateTime: string; // date-time
            /**
             * Expected execution date and time for the payment resource.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            ExpectedExecutionDateTime?: string; // date-time
            /**
             * Expected settlement date and time for the payment resource.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            ExpectedSettlementDateTime?: string; // date-time
            /**
             * Unambiguous identification of the refund account to which a refund will be made as a result of the transaction.
             */
            Refund?: {
              /**
               * Provides the details to identify an account.
               */
              Account: {
                /**
                 * Name of the identification scheme, in a coded form as published in an external list.
                 */
                SchemeName: string;
                /**
                 * Identification assigned by an institution to identify an account. This identification is known by the account owner.
                 */
                Identification: string;
                /**
                 * Name of the account, as assigned by the account servicing institution.
                 * Usage: The account name is the name or names of the account owner(s) represented at an account level. The account name is not the product name or the nickname of the account.
                 * OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory.
                 */
                Name: string;
                /**
                 * This is secondary identification of the account, as assigned by the account servicing institution.
                 * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
                 */
                SecondaryIdentification?: string;
              };
            };
            Charges?: {
              /**
               * Specifies which party/parties will bear the charges associated with the processing of the payment transaction.
               */
              ChargeBearer:
                | "BorneByCreditor"
                | "BorneByDebtor"
                | "FollowingServiceLevel"
                | "Shared";
              /**
               * Charge type, in a coded form.
               */
              Type: string;
              /**
               * Amount of money associated with the charge type.
               */
              Amount: {
                /**
                 * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
                 */
                Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
                /**
                 * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
                 */
                Currency: string; // ^[A-Z]{3,3}$
              };
            }[];
            /**
             * The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single domestic payment.
             */
            Initiation: {
              /**
               * Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction.
               * Usage: the  instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction.
               */
              InstructionIdentification: string;
              /**
               * Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain.
               * Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction.
               * OB: The Faster Payments Scheme can only access 31 characters for the EndToEndIdentification field.
               */
              EndToEndIdentification: string;
              /**
               * User community specific instrument.
               * Usage: This element is used to specify a local instrument, local clearing option and/or further qualify the service or service level.
               */
              LocalInstrument?: string;
              /**
               * Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party.
               * Usage: This amount has to be transported unchanged through the transaction chain.
               */
              InstructedAmount: {
                /**
                 * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
                 */
                Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
                /**
                 * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
                 */
                Currency: string; // ^[A-Z]{3,3}$
              };
              /**
               * Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction.
               */
              DebtorAccount?: {
                /**
                 * Name of the identification scheme, in a coded form as published in an external list.
                 */
                SchemeName: string;
                /**
                 * Identification assigned by an institution to identify an account. This identification is known by the account owner.
                 */
                Identification: string;
                /**
                 * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
                 * Note, the account name is not the product name or the nickname of the account.
                 */
                Name?: string;
                /**
                 * This is secondary identification of the account, as assigned by the account servicing institution.
                 * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
                 */
                SecondaryIdentification?: string;
              };
              /**
               * Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction.
               */
              CreditorAccount: {
                /**
                 * Name of the identification scheme, in a coded form as published in an external list.
                 */
                SchemeName: string;
                /**
                 * Identification assigned by an institution to identify an account. This identification is known by the account owner.
                 */
                Identification: string;
                /**
                 * The account name is the name or names of the account owner(s) represented at an account level.
                 * Note, the account name is not the product name or the nickname of the account.
                 * OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory.
                 */
                Name: string;
                /**
                 * This is secondary identification of the account, as assigned by the account servicing institution.
                 * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
                 */
                SecondaryIdentification?: string;
              };
              /**
               * Information that locates and identifies a specific address, as defined by postal services.
               */
              CreditorPostalAddress?: {
                /**
                 * Identifies the nature of the postal address.
                 */
                AddressType?:
                  | "Business"
                  | "Correspondence"
                  | "DeliveryTo"
                  | "MailTo"
                  | "POBox"
                  | "Postal"
                  | "Residential"
                  | "Statement";
                /**
                 * Identification of a division of a large organisation or building.
                 */
                Department?: string;
                /**
                 * Identification of a sub-division of a large organisation or building.
                 */
                SubDepartment?: string;
                /**
                 * Name of a street or thoroughfare.
                 */
                StreetName?: string;
                /**
                 * Number that identifies the position of a building on a street.
                 */
                BuildingNumber?: string;
                /**
                 * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
                 */
                PostCode?: string;
                /**
                 * Name of a built-up area, with defined boundaries, and a local government.
                 */
                TownName?: string;
                /**
                 * Identifies a subdivision of a country such as state, region, county.
                 */
                CountrySubDivision?: string;
                /**
                 * Nation with its own government.
                 */
                Country?: string; // ^[A-Z]{2,2}$
                AddressLine?: string[];
              };
              /**
               * Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system.
               */
              RemittanceInformation?: {
                /**
                 * Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form.
                 */
                Unstructured?: string;
                /**
                 * Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction.
                 * Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money.
                 * If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification.
                 * OB: The Faster Payments Scheme can only accept 18 characters for the ReferenceInformation field - which is where this ISO field will be mapped.
                 */
                Reference?: string;
              };
              /**
               * Additional information that can not be captured in the structured fields and/or any other specific block.
               */
              SupplementaryData?: unknown;
            };
            /**
             * The multiple authorisation flow response from the ASPSP.
             */
            MultiAuthorisation?: {
              /**
               * Specifies the status of the authorisation flow in code form.
               */
              Status:
                | "Authorised"
                | "AwaitingFurtherAuthorisation"
                | "Rejected";
              /**
               * Number of authorisations required for payment order (total required at the start of the multi authorisation journey).
               */
              NumberRequired?: number;
              /**
               * Number of authorisations received.
               */
              NumberReceived?: number;
              /**
               * Last date and time at the authorisation flow was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
               * All date-time fields in responses must include the timezone. An example is below:
               * 2017-04-05T10:43:07+00:00
               */
              LastUpdateDateTime?: string; // date-time
              /**
               * Date and time at which the requested authorisation flow must be completed.All dates in the JSON payloads are represented in ISO 8601 date-time format.
               * All date-time fields in responses must include the timezone. An example is below:
               * 2017-04-05T10:43:07+00:00
               */
              ExpirationDateTime?: string; // date-time
            };
            /**
             * Set of elements used to identify a person or an organisation.
             */
            Debtor?: {
              /**
               * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account.
               */
              Name?: string;
            };
          };
        };
        /**
         * Tags associated with the resource
         */
        Tags?: string[];
      }[];
      /**
       * Information about the results
       */
      Meta: {
        /**
         * Maximum number of results return in a single request
         */
        PageSize: number;
        /**
         * Number of the previous page. If empty, means the current page is the first one
         */
        PreviousPage?: number;
        /**
         * Number of the next page. If empty, means the current page is the last one
         */
        NextPage?: number;
        /**
         * Total number of pages found
         */
        PageCount: number;
        /**
         * Total number of items found
         */
        ItemCount: number;
      };
      Links: {
        Self: string;
        Next?: string;
        Prev?: string;
      };
    }
    export interface GetFundsConfirmationConsentsResponse {
      Items: {
        ConsentId: string;
        ConsentType: "FundsConfirmation";
        Partnership: {
          PartnershipId: string;
          CustomerFriendlyName: string;
          CustomerFriendlyLogoUri?: string;
        };
        Resource: {
          Data: {
            /**
             * Unique identification as assigned to identify the funds confirmation consent resource.
             */
            ConsentId: string;
            /**
             * Date and time at which the resource was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            CreationDateTime: string; // date-time
            /**
             * Specifies the status of consent resource in code form.
             */
            Status:
              | "Authorised"
              | "AwaitingAuthorisation"
              | "Rejected"
              | "Revoked";
            /**
             * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            StatusUpdateDateTime: string; // date-time
            /**
             * Specified date and time the funds confirmation authorisation will expire.
             * If this is not populated, the authorisation will be open ended.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            ExpirationDateTime?: string; // date-time
            /**
             * Unambiguous identification of the account of the debtor to which a confirmation of funds consent will be applied.
             */
            DebtorAccount: {
              /**
               * Name of the identification scheme, in a coded form as published in an external list.
               */
              SchemeName: string;
              /**
               * Identification assigned by an institution to identify an account. This identification is known by the account owner.
               */
              Identification: string;
              /**
               * Name of the account, as assigned by the account servicing institution.
               * Usage: The account name is the name or names of the account owner(s) represented at an account level. The account name is not the product name or the nickname of the account.
               */
              Name?: string;
              /**
               * This is secondary identification of the account, as assigned by the account servicing institution.
               * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
               */
              SecondaryIdentification?: string;
            };
          };
        };
        /**
         * Tags associated with the resource
         */
        Tags?: string[];
      }[];
      /**
       * Information about the results
       */
      Meta: {
        /**
         * Maximum number of results return in a single request
         */
        PageSize: number;
        /**
         * Number of the previous page. If empty, means the current page is the first one
         */
        PreviousPage?: number;
        /**
         * Number of the next page. If empty, means the current page is the last one
         */
        NextPage?: number;
        /**
         * Total number of pages found
         */
        PageCount: number;
        /**
         * Total number of items found
         */
        ItemCount: number;
      };
      Links: {
        Self: string;
        Next?: string;
        Prev?: string;
      };
    }
    export interface GetJobExecutionsResponse {
      Items: {
        ExecutionId: string;
        JobId: "REFRESH_PENDING_PAYMENTS" | "REFRESH_ACCOUNTS";
        /**
         * Job schedule that triggered the execution. Will be empty if the execution was triggered manually
         */
        ScheduleId?: string;
        /**
         * Timestamp when the execution started
         * example:
         * 2021-01-01T08:00:00Z
         */
        StartDateTime: string;
        /**
         * Timestamp when the execution finished
         * example:
         * 2021-01-01T08:00:00Z
         */
        EndDateTime?: string;
        Result: "In progress" | "Success" | "Failure";
      }[];
      /**
       * Information about the results
       */
      Meta: {
        /**
         * Maximum number of results return in a single request
         */
        PageSize: number;
        /**
         * Number of the previous page. If empty, means the current page is the first one
         */
        PreviousPage?: number;
        /**
         * Number of the next page. If empty, means the current page is the last one
         */
        NextPage?: number;
        /**
         * Total number of pages found
         */
        PageCount: number;
        /**
         * Total number of items found
         */
        ItemCount: number;
      };
      Links: {
        Self: string;
        Next?: string;
        Prev?: string;
      };
    }
    export interface GetJobSchedulesResponse {
      Items: {
        ScheduleId: string;
        JobId: "REFRESH_PENDING_PAYMENTS" | "REFRESH_ACCOUNTS";
        Description?: string;
        /**
         * **Cron** expression that determines when the job should run. The supported format is described [here](https://github.com/harrisiirak/cron-parser)
         */
        ScheduleExpression: string;
        /**
         * Status of the job schedule. Only active jobs will trigger job executions.
         */
        Status: "Active" | "Inactive";
        /**
         * Time when this job will be executed next
         * example:
         * 2021-01-01T08:00:00Z
         */
        NextExecutionDateTime?: string;
        /**
         * Time when this job was executed last
         * example:
         * 2021-01-01T08:00:00Z
         */
        LastExecutionDateTime?: string;
        LastExecutionStatus?: "In progress" | "Success" | "Failure";
        Links: {
          /**
           * Fetches previous executions of this job
           */
          Executions: string;
        };
      }[];
      /**
       * Information about the results
       */
      Meta: {
        /**
         * Maximum number of results return in a single request
         */
        PageSize: number;
        /**
         * Number of the previous page. If empty, means the current page is the first one
         */
        PreviousPage?: number;
        /**
         * Number of the next page. If empty, means the current page is the last one
         */
        NextPage?: number;
        /**
         * Total number of pages found
         */
        PageCount: number;
        /**
         * Total number of items found
         */
        ItemCount: number;
      };
      Links: {
        Self: string;
        Next?: string;
        Prev?: string;
      };
    }
    export interface GetPartnershipsResponse {
      Items: {
        PartnershipId: string;
        CustomerFriendlyName: string;
        CustomerFriendlyLogoUri?: string;
        SupportedModules: ("ais" | "pis" | "cbpii" | "cop")[];
        Links: {
          CreateAccountAccessConsent?: string;
          CreateDomesticPaymentConsent?: string;
          CreateFundsConfirmationConsent?: string;
          ExecuteNameVerificationRequest?: string;
        };
      }[];
      /**
       * Information about the results
       */
      Meta: {
        /**
         * Maximum number of results return in a single request
         */
        PageSize: number;
        /**
         * Number of the previous page. If empty, means the current page is the first one
         */
        PreviousPage?: number;
        /**
         * Number of the next page. If empty, means the current page is the last one
         */
        NextPage?: number;
        /**
         * Total number of pages found
         */
        PageCount: number;
        /**
         * Total number of items found
         */
        ItemCount: number;
      };
      Links: {
        Self: string;
        Next?: string;
        Prev?: string;
      };
    }
    export interface InitializeAccountAccessConsentRequest {}
    export interface InitiateAccountAccessAuthRequest {
      RedirectUri: string;
    }
    /**
     * Amount of money to be confirmed as available funds in the debtor account. Contains an Amount and a Currency.
     */
    export interface InstructedAmount {
      /**
       * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
       */
      Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
      /**
       * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
       */
      Currency: string; // ^[A-Z]{3,3}$
    }
    export type Items = {
      ConsentId: string;
      ConsentType: "AccountAccess";
      Partnership?: {
        PartnershipId: string;
        CustomerFriendlyName: string;
        CustomerFriendlyLogoUri?: string;
      };
      Resource: {
        Data: {
          /**
           * Unique identification as assigned to identify the account access consent resource.
           */
          ConsentId: string;
          /**
           * Date and time at which the resource was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          CreationDateTime: string; // date-time
          /**
           * Specifies the status of consent resource in code form.
           */
          Status:
            | "Authorised"
            | "AwaitingAuthorisation"
            | "Rejected"
            | "Revoked";
          /**
           * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          StatusUpdateDateTime: string; // date-time
          Permissions: (
            | "ReadAccountsBasic"
            | "ReadAccountsDetail"
            | "ReadBalances"
            | "ReadBeneficiariesBasic"
            | "ReadBeneficiariesDetail"
            | "ReadDirectDebits"
            | "ReadOffers"
            | "ReadPAN"
            | "ReadParty"
            | "ReadPartyPSU"
            | "ReadProducts"
            | "ReadScheduledPaymentsBasic"
            | "ReadScheduledPaymentsDetail"
            | "ReadStandingOrdersBasic"
            | "ReadStandingOrdersDetail"
            | "ReadStatementsBasic"
            | "ReadStatementsDetail"
            | "ReadTransactionsBasic"
            | "ReadTransactionsCredits"
            | "ReadTransactionsDebits"
            | "ReadTransactionsDetail"
          )[];
          /**
           * Specified date and time the permissions will expire.
           * If this is not populated, the permissions will be open ended.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          ExpirationDateTime?: string; // date-time
          /**
           * Specified start date and time for the transaction query period.
           * If this is not populated, the start date will be open ended, and data will be returned from the earliest available transaction.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          TransactionFromDateTime?: string; // date-time
          /**
           * Specified end date and time for the transaction query period.
           * If this is not populated, the end date will be open ended, and data will be returned to the latest available transaction.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          TransactionToDateTime?: string; // date-time
        };
        /**
         * The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Account Info.
         */
        Risk: unknown;
      };
      /**
       * Tags associated with the resource
       */
      Tags?: string[];
    }[];
    /**
     * Detailed information on a job execution
     */
    export interface JobExecution {
      ExecutionId: string;
      JobId: "REFRESH_PENDING_PAYMENTS" | "REFRESH_ACCOUNTS";
      /**
       * Job schedule that triggered the execution. Will be empty if the execution was triggered manually
       */
      ScheduleId?: string;
      /**
       * Timestamp when the execution started
       * example:
       * 2021-01-01T08:00:00Z
       */
      StartDateTime: string;
      /**
       * Timestamp when the execution finished
       * example:
       * 2021-01-01T08:00:00Z
       */
      EndDateTime?: string;
      Result: "In progress" | "Success" | "Failure";
      ExecutionLog?: string[];
      ResultDetails?: string;
    }
    export interface JobSchedule {
      ScheduleId: string;
      JobId: "REFRESH_PENDING_PAYMENTS" | "REFRESH_ACCOUNTS";
      Description?: string;
      /**
       * **Cron** expression that determines when the job should run. The supported format is described [here](https://github.com/harrisiirak/cron-parser)
       */
      ScheduleExpression: string;
      /**
       * Status of the job schedule. Only active jobs will trigger job executions.
       */
      Status: "Active" | "Inactive";
      /**
       * Time when this job will be executed next
       * example:
       * 2021-01-01T08:00:00Z
       */
      NextExecutionDateTime?: string;
      /**
       * Time when this job was executed last
       * example:
       * 2021-01-01T08:00:00Z
       */
      LastExecutionDateTime?: string;
      LastExecutionStatus?: "In progress" | "Success" | "Failure";
      Links: {
        /**
         * Fetches previous executions of this job
         */
        Executions: string;
      };
    }
    export interface JobScheduleLinks {
      /**
       * Fetches previous executions of this job
       */
      Executions: string;
    }
    /**
     * Information about the results
     */
    export interface Meta {
      /**
       * Maximum number of results return in a single request
       */
      PageSize: number;
      /**
       * Number of the previous page. If empty, means the current page is the first one
       */
      PreviousPage?: number;
      /**
       * Number of the next page. If empty, means the current page is the last one
       */
      NextPage?: number;
      /**
       * Total number of pages found
       */
      PageCount: number;
      /**
       * Total number of items found
       */
      ItemCount: number;
    }
    /**
     * Unambiguous identification of the account to which credit and debit entries are made.
     */
    export interface Model1 {
      /**
       * A unique and immutable identifier used to identify the account resource. This identifier has no meaning to the account owner.
       */
      AccountId: string;
      /**
       * Specifies the status of account resource in code form.
       */
      Status?: "Deleted" | "Disabled" | "Enabled" | "Pending" | "ProForma";
      /**
       * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
       * All date-time fields in responses must include the timezone. An example is below:
       * 2017-04-05T10:43:07+00:00
       */
      StatusUpdateDateTime?: string; // date-time
      /**
       * Identification of the currency in which the account is held.
       * Usage: Currency should only be used in case one and the same account number covers several currencies
       * and the initiating party needs to identify which currency needs to be used for settlement on the account.
       */
      Currency: string; // ^[A-Z]{3,3}$
      /**
       * Specifies the type of account (personal or business).
       */
      AccountType: "Business" | "Personal";
      /**
       * Specifies the sub type of account (product family group).
       */
      AccountSubType:
        | "ChargeCard"
        | "CreditCard"
        | "CurrentAccount"
        | "EMoney"
        | "Loan"
        | "Mortgage"
        | "PrePaidCard"
        | "Savings";
      /**
       * Specifies the description of the account type.
       */
      Description?: string;
      /**
       * The nickname of the account, assigned by the account owner in order to provide an additional means of identification of the account.
       */
      Nickname?: string;
      /**
       * Date on which the account and related basic services are effectively operational for the account owner.All dates in the JSON payloads are represented in ISO 8601 date-time format.
       * All date-time fields in responses must include the timezone. An example is below:
       * 2017-04-05T10:43:07+00:00
       */
      OpeningDate?: string; // date-time
      /**
       * Maturity date of the account.All dates in the JSON payloads are represented in ISO 8601 date-time format.
       * All date-time fields in responses must include the timezone. An example is below:
       * 2017-04-05T10:43:07+00:00
       */
      MaturityDate?: string; // date-time
      /**
       * Specifies the switch status for the account, in a coded form.
       */
      SwitchStatus?: string;
      Account?: {
        /**
         * Name of the identification scheme, in a coded form as published in an external list.
         */
        SchemeName: string;
        /**
         * Identification assigned by an institution to identify an account. This identification is known by the account owner.
         */
        Identification: string;
        /**
         * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
         * Note, the account name is not the product name or the nickname of the account.
         */
        Name?: string;
        /**
         * This is secondary identification of the account, as assigned by the account servicing institution.
         * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
         */
        SecondaryIdentification?: string;
      }[];
      /**
       * Party that manages the account on behalf of the account owner, that is manages the registration and booking of entries on the account, calculates balances on the account and provides information about the account.
       */
      Servicer?: {
        /**
         * Name of the identification scheme, in a coded form as published in an external list.
         */
        SchemeName: string;
        /**
         * Unique and unambiguous identification of the servicing institution.
         */
        Identification: string;
      };
    }
    /**
     * Search result for a job execution. Doesn't contain detailed information
     */
    export interface Model10 {
      ExecutionId: string;
      JobId: "REFRESH_PENDING_PAYMENTS" | "REFRESH_ACCOUNTS";
      /**
       * Job schedule that triggered the execution. Will be empty if the execution was triggered manually
       */
      ScheduleId?: string;
      /**
       * Timestamp when the execution started
       * example:
       * 2021-01-01T08:00:00Z
       */
      StartDateTime: string;
      /**
       * Timestamp when the execution finished
       * example:
       * 2021-01-01T08:00:00Z
       */
      EndDateTime?: string;
      Result: "In progress" | "Success" | "Failure";
    }
    export type Model11 = {
      ExecutionId: string;
      JobId: "REFRESH_PENDING_PAYMENTS" | "REFRESH_ACCOUNTS";
      /**
       * Job schedule that triggered the execution. Will be empty if the execution was triggered manually
       */
      ScheduleId?: string;
      /**
       * Timestamp when the execution started
       * example:
       * 2021-01-01T08:00:00Z
       */
      StartDateTime: string;
      /**
       * Timestamp when the execution finished
       * example:
       * 2021-01-01T08:00:00Z
       */
      EndDateTime?: string;
      Result: "In progress" | "Success" | "Failure";
    }[];
    export type Model12 = {
      ScheduleId: string;
      JobId: "REFRESH_PENDING_PAYMENTS" | "REFRESH_ACCOUNTS";
      Description?: string;
      /**
       * **Cron** expression that determines when the job should run. The supported format is described [here](https://github.com/harrisiirak/cron-parser)
       */
      ScheduleExpression: string;
      /**
       * Status of the job schedule. Only active jobs will trigger job executions.
       */
      Status: "Active" | "Inactive";
      /**
       * Time when this job will be executed next
       * example:
       * 2021-01-01T08:00:00Z
       */
      NextExecutionDateTime?: string;
      /**
       * Time when this job was executed last
       * example:
       * 2021-01-01T08:00:00Z
       */
      LastExecutionDateTime?: string;
      LastExecutionStatus?: "In progress" | "Success" | "Failure";
      Links: {
        /**
         * Fetches previous executions of this job
         */
        Executions: string;
      };
    }[];
    export type Model13 = {
      PartnershipId: string;
      CustomerFriendlyName: string;
      CustomerFriendlyLogoUri?: string;
      SupportedModules: ("ais" | "pis" | "cbpii" | "cop")[];
      Links: {
        CreateAccountAccessConsent?: string;
        CreateDomesticPaymentConsent?: string;
        CreateFundsConfirmationConsent?: string;
        ExecuteNameVerificationRequest?: string;
      };
    }[];
    export interface Model14 {
      /**
       * Provides further details on an entry in the report.
       */
      Resource: {
        /**
         * A unique and immutable identifier used to identify the account resource. This identifier has no meaning to the account owner.
         */
        AccountId: string;
        /**
         * Unique identifier for the transaction within an servicing institution. This identifier is both unique and immutable.
         */
        TransactionId?: string;
        /**
         * Unique reference for the transaction. This reference is optionally populated, and may as an example be the FPID in the Faster Payments context.
         */
        TransactionReference?: string;
        StatementReference?: string[];
        /**
         * Indicates whether the transaction is a credit or a debit entry.
         */
        CreditDebitIndicator: "Credit" | "Debit";
        /**
         * Status of a transaction entry on the books of the account servicer.
         */
        Status: "Booked" | "Pending";
        /**
         * Specifies the Mutability of the Transaction record.
         */
        TransactionMutability?: "Mutable" | "Immutable";
        /**
         * Date and time when a transaction entry is posted to an account on the account servicer's books.
         * Usage: Booking date is the expected booking date, unless the status is booked, in which case it is the actual booking date.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        BookingDateTime: string; // date-time
        /**
         * Date and time at which assets become available to the account owner in case of a credit entry, or cease to be available to the account owner in case of a debit transaction entry.
         * Usage: If transaction entry status is pending and value date is present, then the value date refers to an expected/requested value date.
         * For transaction entries subject to availability/float and for which availability information is provided, the value date must not be used. In this case the availability component identifies the number of availability days.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        ValueDateTime?: string; // date-time
        /**
         * Further details of the transaction.
         * This is the transaction narrative, which is unstructured text.
         */
        TransactionInformation?: string;
        /**
         * Information that locates and identifies a specific address for a transaction entry, that is presented in free format text.
         */
        AddressLine?: string;
        /**
         * Amount of money in the cash transaction entry.
         */
        Amount: {
          /**
           * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
           */
          Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
          /**
           * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
           */
          Currency: string; // ^[A-Z]{3,3}$
        };
        /**
         * Transaction charges to be paid by the charge bearer.
         */
        ChargeAmount?: {
          /**
           * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
           */
          Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
          /**
           * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
           */
          Currency: string; // ^[A-Z]{3,3}$
        };
        /**
         * Set of elements used to provide details on the currency exchange.
         */
        CurrencyExchange?: {
          /**
           * Currency from which an amount is to be converted in a currency conversion.
           */
          SourceCurrency: string; // ^[A-Z]{3,3}$
          /**
           * Currency into which an amount is to be converted in a currency conversion.
           */
          TargetCurrency?: string; // ^[A-Z]{3,3}$
          /**
           * Currency in which the rate of exchange is expressed in a currency exchange. In the example 1GBP = xxxCUR, the unit currency is GBP.
           */
          UnitCurrency?: string; // ^[A-Z]{3,3}$
          /**
           * Factor used to convert an amount from one currency into another. This reflects the price at which one currency was bought with another currency.
           * Usage: ExchangeRate expresses the ratio between UnitCurrency and QuotedCurrency (ExchangeRate = UnitCurrency/QuotedCurrency).
           */
          ExchangeRate: number;
          /**
           * Unique identification to unambiguously identify the foreign exchange contract.
           */
          ContractIdentification?: string;
          /**
           * Date and time at which an exchange rate is quoted.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          QuotationDate?: string; // date-time
          /**
           * Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party.
           */
          InstructedAmount?: {
            /**
             * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
             */
            Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
            /**
             * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
             */
            Currency: string; // ^[A-Z]{3,3}$
          };
        };
        /**
         * Set of elements used to fully identify the type of underlying transaction resulting in an entry.
         */
        BankTransactionCode?: {
          /**
           * Specifies the family within a domain.
           */
          Code: string;
          /**
           * Specifies the sub-product family within a specific family.
           */
          SubCode: string;
        };
        /**
         * Set of elements to fully identify a proprietary bank transaction code.
         */
        ProprietaryBankTransactionCode?: {
          /**
           * Proprietary bank transaction code to identify the underlying transaction.
           */
          Code: string;
          /**
           * Identification of the issuer of the proprietary bank transaction code.
           */
          Issuer?: string;
        };
        /**
         * Set of elements used to define the balance as a numerical representation of the net increases and decreases in an account after a transaction entry is applied to the account.
         */
        Balance?: {
          /**
           * Indicates whether the balance is a credit or a debit balance.
           * Usage: A zero balance is considered to be a credit balance.
           */
          CreditDebitIndicator: "Credit" | "Debit";
          /**
           * Balance type, in a coded form.
           */
          Type:
            | "ClosingAvailable"
            | "ClosingBooked"
            | "ClosingCleared"
            | "Expected"
            | "ForwardAvailable"
            | "Information"
            | "InterimAvailable"
            | "InterimBooked"
            | "InterimCleared"
            | "OpeningAvailable"
            | "OpeningBooked"
            | "OpeningCleared"
            | "PreviouslyClosedBooked";
          /**
           * Amount of money of the cash balance after a transaction entry is applied to the account..
           */
          Amount: {
            /**
             * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
             */
            Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
            /**
             * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
             */
            Currency: string; // ^[A-Z]{3,3}$
          };
        };
        /**
         * Details of the merchant involved in the transaction.
         */
        MerchantDetails?: {
          /**
           * Name by which the merchant is known.
           */
          MerchantName?: string;
          /**
           * Category code conform to ISO 18245, related to the type of services or goods the merchant provides for the transaction.
           */
          MerchantCategoryCode?: string;
        };
        /**
         * Financial institution servicing an account for the creditor.
         */
        CreditorAgent?: {
          /**
           * Name of the identification scheme, in a coded form as published in an external list.
           */
          SchemeName?: string;
          /**
           * Unique and unambiguous identification of a financial institution or a branch of a financial institution.
           */
          Identification?: string;
          /**
           * Name by which an agent is known and which is usually used to identify that agent.
           */
          Name?: string;
          /**
           * Information that locates and identifies a specific address, as defined by postal services.
           */
          PostalAddress?: {
            /**
             * Identifies the nature of the postal address.
             */
            AddressType?:
              | "Business"
              | "Correspondence"
              | "DeliveryTo"
              | "MailTo"
              | "POBox"
              | "Postal"
              | "Residential"
              | "Statement";
            /**
             * Identification of a division of a large organisation or building.
             */
            Department?: string;
            /**
             * Identification of a sub-division of a large organisation or building.
             */
            SubDepartment?: string;
            /**
             * Name of a street or thoroughfare.
             */
            StreetName?: string;
            /**
             * Number that identifies the position of a building on a street.
             */
            BuildingNumber?: string;
            /**
             * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
             */
            PostCode?: string;
            /**
             * Name of a built-up area, with defined boundaries, and a local government.
             */
            TownName?: string;
            /**
             * Identifies a subdivision of a country such as state, region, county.
             */
            CountrySubDivision?: string;
            /**
             * Nation with its own government.
             */
            Country?: string; // ^[A-Z]{2,2}$
            AddressLine?: string[];
          };
        };
        /**
         * Unambiguous identification of the account of the creditor, in the case of a debit transaction.
         */
        CreditorAccount?: {
          /**
           * Name of the identification scheme, in a coded form as published in an external list.
           */
          SchemeName?: string;
          /**
           * Identification assigned by an institution to identify an account. This identification is known by the account owner.
           */
          Identification?: string;
          /**
           * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
           * Note, the account name is not the product name or the nickname of the account.
           */
          Name?: string;
          /**
           * This is secondary identification of the account, as assigned by the account servicing institution.
           * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
           */
          SecondaryIdentification?: string;
        };
        /**
         * Financial institution servicing an account for the debtor.
         */
        DebtorAgent?: {
          /**
           * Name of the identification scheme, in a coded form as published in an external list.
           */
          SchemeName?: string;
          /**
           * Unique and unambiguous identification of a financial institution or a branch of a financial institution.
           */
          Identification?: string;
          /**
           * Name by which an agent is known and which is usually used to identify that agent.
           */
          Name?: string;
          /**
           * Information that locates and identifies a specific address, as defined by postal services.
           */
          PostalAddress?: {
            /**
             * Identifies the nature of the postal address.
             */
            AddressType?:
              | "Business"
              | "Correspondence"
              | "DeliveryTo"
              | "MailTo"
              | "POBox"
              | "Postal"
              | "Residential"
              | "Statement";
            /**
             * Identification of a division of a large organisation or building.
             */
            Department?: string;
            /**
             * Identification of a sub-division of a large organisation or building.
             */
            SubDepartment?: string;
            /**
             * Name of a street or thoroughfare.
             */
            StreetName?: string;
            /**
             * Number that identifies the position of a building on a street.
             */
            BuildingNumber?: string;
            /**
             * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
             */
            PostCode?: string;
            /**
             * Name of a built-up area, with defined boundaries, and a local government.
             */
            TownName?: string;
            /**
             * Identifies a subdivision of a country such as state, region, county.
             */
            CountrySubDivision?: string;
            /**
             * Nation with its own government.
             */
            Country?: string; // ^[A-Z]{2,2}$
            AddressLine?: string[];
          };
        };
        /**
         * Unambiguous identification of the account of the debtor, in the case of a crebit transaction.
         */
        DebtorAccount?: {
          /**
           * Name of the identification scheme, in a coded form as published in an external list.
           */
          SchemeName?: string;
          /**
           * Identification assigned by an institution to identify an account. This identification is known by the account owner.
           */
          Identification?: string;
          /**
           * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
           * Note, the account name is not the product name or the nickname of the account.
           */
          Name?: string;
          /**
           * This is secondary identification of the account, as assigned by the account servicing institution.
           * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
           */
          SecondaryIdentification?: string;
        };
        /**
         * Set of elements to describe the card instrument used in the transaction.
         */
        CardInstrument?: {
          /**
           * Name of the card scheme.
           */
          CardSchemeName:
            | "AmericanExpress"
            | "Diners"
            | "Discover"
            | "MasterCard"
            | "VISA";
          /**
           * The card authorisation type.
           */
          AuthorisationType?: "ConsumerDevice" | "Contactless" | "None" | "PIN";
          /**
           * Name of the cardholder using the card instrument.
           */
          Name?: string;
          /**
           * Identification assigned by an institution to identify the card instrument used in the transaction. This identification is known by the account owner, and may be masked.
           */
          Identification?: string;
        };
        /**
         * Additional information that can not be captured in the structured fields and/or any other specific block.
         */
        SupplementaryData?: unknown;
      };
    }
    export type Model15 = {
      /**
       * Provides further details on an entry in the report.
       */
      Resource: {
        /**
         * A unique and immutable identifier used to identify the account resource. This identifier has no meaning to the account owner.
         */
        AccountId: string;
        /**
         * Unique identifier for the transaction within an servicing institution. This identifier is both unique and immutable.
         */
        TransactionId?: string;
        /**
         * Unique reference for the transaction. This reference is optionally populated, and may as an example be the FPID in the Faster Payments context.
         */
        TransactionReference?: string;
        StatementReference?: string[];
        /**
         * Indicates whether the transaction is a credit or a debit entry.
         */
        CreditDebitIndicator: "Credit" | "Debit";
        /**
         * Status of a transaction entry on the books of the account servicer.
         */
        Status: "Booked" | "Pending";
        /**
         * Specifies the Mutability of the Transaction record.
         */
        TransactionMutability?: "Mutable" | "Immutable";
        /**
         * Date and time when a transaction entry is posted to an account on the account servicer's books.
         * Usage: Booking date is the expected booking date, unless the status is booked, in which case it is the actual booking date.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        BookingDateTime: string; // date-time
        /**
         * Date and time at which assets become available to the account owner in case of a credit entry, or cease to be available to the account owner in case of a debit transaction entry.
         * Usage: If transaction entry status is pending and value date is present, then the value date refers to an expected/requested value date.
         * For transaction entries subject to availability/float and for which availability information is provided, the value date must not be used. In this case the availability component identifies the number of availability days.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        ValueDateTime?: string; // date-time
        /**
         * Further details of the transaction.
         * This is the transaction narrative, which is unstructured text.
         */
        TransactionInformation?: string;
        /**
         * Information that locates and identifies a specific address for a transaction entry, that is presented in free format text.
         */
        AddressLine?: string;
        /**
         * Amount of money in the cash transaction entry.
         */
        Amount: {
          /**
           * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
           */
          Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
          /**
           * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
           */
          Currency: string; // ^[A-Z]{3,3}$
        };
        /**
         * Transaction charges to be paid by the charge bearer.
         */
        ChargeAmount?: {
          /**
           * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
           */
          Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
          /**
           * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
           */
          Currency: string; // ^[A-Z]{3,3}$
        };
        /**
         * Set of elements used to provide details on the currency exchange.
         */
        CurrencyExchange?: {
          /**
           * Currency from which an amount is to be converted in a currency conversion.
           */
          SourceCurrency: string; // ^[A-Z]{3,3}$
          /**
           * Currency into which an amount is to be converted in a currency conversion.
           */
          TargetCurrency?: string; // ^[A-Z]{3,3}$
          /**
           * Currency in which the rate of exchange is expressed in a currency exchange. In the example 1GBP = xxxCUR, the unit currency is GBP.
           */
          UnitCurrency?: string; // ^[A-Z]{3,3}$
          /**
           * Factor used to convert an amount from one currency into another. This reflects the price at which one currency was bought with another currency.
           * Usage: ExchangeRate expresses the ratio between UnitCurrency and QuotedCurrency (ExchangeRate = UnitCurrency/QuotedCurrency).
           */
          ExchangeRate: number;
          /**
           * Unique identification to unambiguously identify the foreign exchange contract.
           */
          ContractIdentification?: string;
          /**
           * Date and time at which an exchange rate is quoted.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          QuotationDate?: string; // date-time
          /**
           * Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party.
           */
          InstructedAmount?: {
            /**
             * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
             */
            Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
            /**
             * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
             */
            Currency: string; // ^[A-Z]{3,3}$
          };
        };
        /**
         * Set of elements used to fully identify the type of underlying transaction resulting in an entry.
         */
        BankTransactionCode?: {
          /**
           * Specifies the family within a domain.
           */
          Code: string;
          /**
           * Specifies the sub-product family within a specific family.
           */
          SubCode: string;
        };
        /**
         * Set of elements to fully identify a proprietary bank transaction code.
         */
        ProprietaryBankTransactionCode?: {
          /**
           * Proprietary bank transaction code to identify the underlying transaction.
           */
          Code: string;
          /**
           * Identification of the issuer of the proprietary bank transaction code.
           */
          Issuer?: string;
        };
        /**
         * Set of elements used to define the balance as a numerical representation of the net increases and decreases in an account after a transaction entry is applied to the account.
         */
        Balance?: {
          /**
           * Indicates whether the balance is a credit or a debit balance.
           * Usage: A zero balance is considered to be a credit balance.
           */
          CreditDebitIndicator: "Credit" | "Debit";
          /**
           * Balance type, in a coded form.
           */
          Type:
            | "ClosingAvailable"
            | "ClosingBooked"
            | "ClosingCleared"
            | "Expected"
            | "ForwardAvailable"
            | "Information"
            | "InterimAvailable"
            | "InterimBooked"
            | "InterimCleared"
            | "OpeningAvailable"
            | "OpeningBooked"
            | "OpeningCleared"
            | "PreviouslyClosedBooked";
          /**
           * Amount of money of the cash balance after a transaction entry is applied to the account..
           */
          Amount: {
            /**
             * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
             */
            Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
            /**
             * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
             */
            Currency: string; // ^[A-Z]{3,3}$
          };
        };
        /**
         * Details of the merchant involved in the transaction.
         */
        MerchantDetails?: {
          /**
           * Name by which the merchant is known.
           */
          MerchantName?: string;
          /**
           * Category code conform to ISO 18245, related to the type of services or goods the merchant provides for the transaction.
           */
          MerchantCategoryCode?: string;
        };
        /**
         * Financial institution servicing an account for the creditor.
         */
        CreditorAgent?: {
          /**
           * Name of the identification scheme, in a coded form as published in an external list.
           */
          SchemeName?: string;
          /**
           * Unique and unambiguous identification of a financial institution or a branch of a financial institution.
           */
          Identification?: string;
          /**
           * Name by which an agent is known and which is usually used to identify that agent.
           */
          Name?: string;
          /**
           * Information that locates and identifies a specific address, as defined by postal services.
           */
          PostalAddress?: {
            /**
             * Identifies the nature of the postal address.
             */
            AddressType?:
              | "Business"
              | "Correspondence"
              | "DeliveryTo"
              | "MailTo"
              | "POBox"
              | "Postal"
              | "Residential"
              | "Statement";
            /**
             * Identification of a division of a large organisation or building.
             */
            Department?: string;
            /**
             * Identification of a sub-division of a large organisation or building.
             */
            SubDepartment?: string;
            /**
             * Name of a street or thoroughfare.
             */
            StreetName?: string;
            /**
             * Number that identifies the position of a building on a street.
             */
            BuildingNumber?: string;
            /**
             * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
             */
            PostCode?: string;
            /**
             * Name of a built-up area, with defined boundaries, and a local government.
             */
            TownName?: string;
            /**
             * Identifies a subdivision of a country such as state, region, county.
             */
            CountrySubDivision?: string;
            /**
             * Nation with its own government.
             */
            Country?: string; // ^[A-Z]{2,2}$
            AddressLine?: string[];
          };
        };
        /**
         * Unambiguous identification of the account of the creditor, in the case of a debit transaction.
         */
        CreditorAccount?: {
          /**
           * Name of the identification scheme, in a coded form as published in an external list.
           */
          SchemeName?: string;
          /**
           * Identification assigned by an institution to identify an account. This identification is known by the account owner.
           */
          Identification?: string;
          /**
           * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
           * Note, the account name is not the product name or the nickname of the account.
           */
          Name?: string;
          /**
           * This is secondary identification of the account, as assigned by the account servicing institution.
           * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
           */
          SecondaryIdentification?: string;
        };
        /**
         * Financial institution servicing an account for the debtor.
         */
        DebtorAgent?: {
          /**
           * Name of the identification scheme, in a coded form as published in an external list.
           */
          SchemeName?: string;
          /**
           * Unique and unambiguous identification of a financial institution or a branch of a financial institution.
           */
          Identification?: string;
          /**
           * Name by which an agent is known and which is usually used to identify that agent.
           */
          Name?: string;
          /**
           * Information that locates and identifies a specific address, as defined by postal services.
           */
          PostalAddress?: {
            /**
             * Identifies the nature of the postal address.
             */
            AddressType?:
              | "Business"
              | "Correspondence"
              | "DeliveryTo"
              | "MailTo"
              | "POBox"
              | "Postal"
              | "Residential"
              | "Statement";
            /**
             * Identification of a division of a large organisation or building.
             */
            Department?: string;
            /**
             * Identification of a sub-division of a large organisation or building.
             */
            SubDepartment?: string;
            /**
             * Name of a street or thoroughfare.
             */
            StreetName?: string;
            /**
             * Number that identifies the position of a building on a street.
             */
            BuildingNumber?: string;
            /**
             * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
             */
            PostCode?: string;
            /**
             * Name of a built-up area, with defined boundaries, and a local government.
             */
            TownName?: string;
            /**
             * Identifies a subdivision of a country such as state, region, county.
             */
            CountrySubDivision?: string;
            /**
             * Nation with its own government.
             */
            Country?: string; // ^[A-Z]{2,2}$
            AddressLine?: string[];
          };
        };
        /**
         * Unambiguous identification of the account of the debtor, in the case of a crebit transaction.
         */
        DebtorAccount?: {
          /**
           * Name of the identification scheme, in a coded form as published in an external list.
           */
          SchemeName?: string;
          /**
           * Identification assigned by an institution to identify an account. This identification is known by the account owner.
           */
          Identification?: string;
          /**
           * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
           * Note, the account name is not the product name or the nickname of the account.
           */
          Name?: string;
          /**
           * This is secondary identification of the account, as assigned by the account servicing institution.
           * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
           */
          SecondaryIdentification?: string;
        };
        /**
         * Set of elements to describe the card instrument used in the transaction.
         */
        CardInstrument?: {
          /**
           * Name of the card scheme.
           */
          CardSchemeName:
            | "AmericanExpress"
            | "Diners"
            | "Discover"
            | "MasterCard"
            | "VISA";
          /**
           * The card authorisation type.
           */
          AuthorisationType?: "ConsumerDevice" | "Contactless" | "None" | "PIN";
          /**
           * Name of the cardholder using the card instrument.
           */
          Name?: string;
          /**
           * Identification assigned by an institution to identify the card instrument used in the transaction. This identification is known by the account owner, and may be masked.
           */
          Identification?: string;
        };
        /**
         * Additional information that can not be captured in the structured fields and/or any other specific block.
         */
        SupplementaryData?: unknown;
      };
    }[];
    /**
     * Set of elements used to define the balance details.
     */
    export interface Model16 {
      /**
       * A unique and immutable identifier used to identify the account resource. This identifier has no meaning to the account owner.
       */
      AccountId: string;
      /**
       * Indicates whether the balance is a credit or a debit balance.
       * Usage: A zero balance is considered to be a credit balance.
       */
      CreditDebitIndicator: "Credit" | "Debit";
      /**
       * Balance type, in a coded form.
       */
      Type:
        | "ClosingAvailable"
        | "ClosingBooked"
        | "ClosingCleared"
        | "Expected"
        | "ForwardAvailable"
        | "Information"
        | "InterimAvailable"
        | "InterimBooked"
        | "InterimCleared"
        | "OpeningAvailable"
        | "OpeningBooked"
        | "OpeningCleared"
        | "PreviouslyClosedBooked";
      /**
       * Indicates the date (and time) of the balance.All dates in the JSON payloads are represented in ISO 8601 date-time format.
       * All date-time fields in responses must include the timezone. An example is below:
       * 2017-04-05T10:43:07+00:00
       */
      DateTime: string; // date-time
      /**
       * Amount of money of the cash balance.
       */
      Amount: {
        /**
         * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
         */
        Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
        /**
         * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
         */
        Currency: string; // ^[A-Z]{3,3}$
      };
      CreditLine?: {
        /**
         * Indicates whether or not the credit line is included in the balance of the account.
         * Usage: If not present, credit line is not included in the balance amount of the account.
         */
        Included: boolean;
        /**
         * Limit type, in a coded form.
         */
        Type?:
          | "Available"
          | "Credit"
          | "Emergency"
          | "Pre-Agreed"
          | "Temporary";
        /**
         * Amount of money of the credit line.
         */
        Amount?: {
          /**
           * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
           */
          Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
          /**
           * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
           */
          Currency: string; // ^[A-Z]{3,3}$
        };
      }[];
    }
    export interface Model17 {
      /**
       * Set of elements used to define the balance details.
       */
      Resource: {
        /**
         * A unique and immutable identifier used to identify the account resource. This identifier has no meaning to the account owner.
         */
        AccountId: string;
        /**
         * Indicates whether the balance is a credit or a debit balance.
         * Usage: A zero balance is considered to be a credit balance.
         */
        CreditDebitIndicator: "Credit" | "Debit";
        /**
         * Balance type, in a coded form.
         */
        Type:
          | "ClosingAvailable"
          | "ClosingBooked"
          | "ClosingCleared"
          | "Expected"
          | "ForwardAvailable"
          | "Information"
          | "InterimAvailable"
          | "InterimBooked"
          | "InterimCleared"
          | "OpeningAvailable"
          | "OpeningBooked"
          | "OpeningCleared"
          | "PreviouslyClosedBooked";
        /**
         * Indicates the date (and time) of the balance.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        DateTime: string; // date-time
        /**
         * Amount of money of the cash balance.
         */
        Amount: {
          /**
           * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
           */
          Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
          /**
           * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
           */
          Currency: string; // ^[A-Z]{3,3}$
        };
        CreditLine?: {
          /**
           * Indicates whether or not the credit line is included in the balance of the account.
           * Usage: If not present, credit line is not included in the balance amount of the account.
           */
          Included: boolean;
          /**
           * Limit type, in a coded form.
           */
          Type?:
            | "Available"
            | "Credit"
            | "Emergency"
            | "Pre-Agreed"
            | "Temporary";
          /**
           * Amount of money of the credit line.
           */
          Amount?: {
            /**
             * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
             */
            Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
            /**
             * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
             */
            Currency: string; // ^[A-Z]{3,3}$
          };
        }[];
      };
    }
    export type Model18 = {
      /**
       * Set of elements used to define the balance details.
       */
      Resource: {
        /**
         * A unique and immutable identifier used to identify the account resource. This identifier has no meaning to the account owner.
         */
        AccountId: string;
        /**
         * Indicates whether the balance is a credit or a debit balance.
         * Usage: A zero balance is considered to be a credit balance.
         */
        CreditDebitIndicator: "Credit" | "Debit";
        /**
         * Balance type, in a coded form.
         */
        Type:
          | "ClosingAvailable"
          | "ClosingBooked"
          | "ClosingCleared"
          | "Expected"
          | "ForwardAvailable"
          | "Information"
          | "InterimAvailable"
          | "InterimBooked"
          | "InterimCleared"
          | "OpeningAvailable"
          | "OpeningBooked"
          | "OpeningCleared"
          | "PreviouslyClosedBooked";
        /**
         * Indicates the date (and time) of the balance.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        DateTime: string; // date-time
        /**
         * Amount of money of the cash balance.
         */
        Amount: {
          /**
           * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
           */
          Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
          /**
           * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
           */
          Currency: string; // ^[A-Z]{3,3}$
        };
        CreditLine?: {
          /**
           * Indicates whether or not the credit line is included in the balance of the account.
           * Usage: If not present, credit line is not included in the balance amount of the account.
           */
          Included: boolean;
          /**
           * Limit type, in a coded form.
           */
          Type?:
            | "Available"
            | "Credit"
            | "Emergency"
            | "Pre-Agreed"
            | "Temporary";
          /**
           * Amount of money of the credit line.
           */
          Amount?: {
            /**
             * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
             */
            Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
            /**
             * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
             */
            Currency: string; // ^[A-Z]{3,3}$
          };
        }[];
      };
    }[];
    export interface Model19 {
      /**
       * Result of a funds availability check.
       */
      FundsAvailableResult?: {
        /**
         * Date and time at which the funds availability check was generated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        FundsAvailableDateTime: string; // date-time
        /**
         * Flag to indicate the availability of funds given the Amount in the consent request.
         */
        FundsAvailable: boolean;
      };
      /**
       * Additional information that can not be captured in the structured fields and/or any other specific block.
       */
      SupplementaryData?: unknown;
    }
    export type Model2 = {
      AccountId: string;
      Resource: {
        /**
         * Unambiguous identification of the account to which credit and debit entries are made.
         */
        Data: {
          /**
           * A unique and immutable identifier used to identify the account resource. This identifier has no meaning to the account owner.
           */
          AccountId: string;
          /**
           * Specifies the status of account resource in code form.
           */
          Status?: "Deleted" | "Disabled" | "Enabled" | "Pending" | "ProForma";
          /**
           * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          StatusUpdateDateTime?: string; // date-time
          /**
           * Identification of the currency in which the account is held.
           * Usage: Currency should only be used in case one and the same account number covers several currencies
           * and the initiating party needs to identify which currency needs to be used for settlement on the account.
           */
          Currency: string; // ^[A-Z]{3,3}$
          /**
           * Specifies the type of account (personal or business).
           */
          AccountType: "Business" | "Personal";
          /**
           * Specifies the sub type of account (product family group).
           */
          AccountSubType:
            | "ChargeCard"
            | "CreditCard"
            | "CurrentAccount"
            | "EMoney"
            | "Loan"
            | "Mortgage"
            | "PrePaidCard"
            | "Savings";
          /**
           * Specifies the description of the account type.
           */
          Description?: string;
          /**
           * The nickname of the account, assigned by the account owner in order to provide an additional means of identification of the account.
           */
          Nickname?: string;
          /**
           * Date on which the account and related basic services are effectively operational for the account owner.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          OpeningDate?: string; // date-time
          /**
           * Maturity date of the account.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          MaturityDate?: string; // date-time
          /**
           * Specifies the switch status for the account, in a coded form.
           */
          SwitchStatus?: string;
          Account?: {
            /**
             * Name of the identification scheme, in a coded form as published in an external list.
             */
            SchemeName: string;
            /**
             * Identification assigned by an institution to identify an account. This identification is known by the account owner.
             */
            Identification: string;
            /**
             * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
             * Note, the account name is not the product name or the nickname of the account.
             */
            Name?: string;
            /**
             * This is secondary identification of the account, as assigned by the account servicing institution.
             * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
             */
            SecondaryIdentification?: string;
          }[];
          /**
           * Party that manages the account on behalf of the account owner, that is manages the registration and booking of entries on the account, calculates balances on the account and provides information about the account.
           */
          Servicer?: {
            /**
             * Name of the identification scheme, in a coded form as published in an external list.
             */
            SchemeName: string;
            /**
             * Unique and unambiguous identification of the servicing institution.
             */
            Identification: string;
          };
        };
      };
      Partnership: {
        PartnershipId: string;
        CustomerFriendlyName: string;
        CustomerFriendlyLogoUri?: string;
      };
      /**
       * Tags associated with the resource
       */
      Tags?: string[];
    }[];
    export interface Model20 {
      Permissions: (
        | "ReadAccountsBasic"
        | "ReadAccountsDetail"
        | "ReadBalances"
        | "ReadBeneficiariesBasic"
        | "ReadBeneficiariesDetail"
        | "ReadDirectDebits"
        | "ReadOffers"
        | "ReadPAN"
        | "ReadParty"
        | "ReadPartyPSU"
        | "ReadProducts"
        | "ReadScheduledPaymentsBasic"
        | "ReadScheduledPaymentsDetail"
        | "ReadStandingOrdersBasic"
        | "ReadStandingOrdersDetail"
        | "ReadStatementsBasic"
        | "ReadStatementsDetail"
        | "ReadTransactionsBasic"
        | "ReadTransactionsCredits"
        | "ReadTransactionsDebits"
        | "ReadTransactionsDetail"
      )[];
      /**
       * Specified date and time the permissions will expire.
       * If this is not populated, the permissions will be open ended.All dates in the JSON payloads are represented in ISO 8601 date-time format.
       * All date-time fields in responses must include the timezone. An example is below:
       * 2017-04-05T10:43:07+00:00
       */
      ExpirationDateTime?: string; // date-time
      /**
       * Specified start date and time for the transaction query period.
       * If this is not populated, the start date will be open ended, and data will be returned from the earliest available transaction.All dates in the JSON payloads are represented in ISO 8601 date-time format.
       * All date-time fields in responses must include the timezone. An example is below:
       * 2017-04-05T10:43:07+00:00
       */
      TransactionFromDateTime?: string; // date-time
      /**
       * Specified end date and time for the transaction query period.
       * If this is not populated, the end date will be open ended, and data will be returned to the latest available transaction.All dates in the JSON payloads are represented in ISO 8601 date-time format.
       * All date-time fields in responses must include the timezone. An example is below:
       * 2017-04-05T10:43:07+00:00
       */
      TransactionToDateTime?: string; // date-time
    }
    /**
     * The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Account Info.
     */
    export interface Model21 {}
    export interface Model22 {
      /**
       * Specifies to share the refund account details with PISP
       */
      ReadRefundAccount?: "No" | "Yes";
      /**
       * The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single domestic payment.
       */
      Initiation: {
        /**
         * Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction.
         * Usage: the  instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction.
         */
        InstructionIdentification: string;
        /**
         * Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain.
         * Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction.
         * OB: The Faster Payments Scheme can only access 31 characters for the EndToEndIdentification field.
         */
        EndToEndIdentification: string;
        /**
         * User community specific instrument.
         * Usage: This element is used to specify a local instrument, local clearing option and/or further qualify the service or service level.
         */
        LocalInstrument?: string;
        /**
         * Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party.
         * Usage: This amount has to be transported unchanged through the transaction chain.
         */
        InstructedAmount: {
          /**
           * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
           */
          Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
          /**
           * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
           */
          Currency: string; // ^[A-Z]{3,3}$
        };
        /**
         * Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction.
         */
        DebtorAccount?: {
          /**
           * Name of the identification scheme, in a coded form as published in an external list.
           */
          SchemeName: string;
          /**
           * Identification assigned by an institution to identify an account. This identification is known by the account owner.
           */
          Identification: string;
          /**
           * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
           * Note, the account name is not the product name or the nickname of the account.
           */
          Name?: string;
          /**
           * This is secondary identification of the account, as assigned by the account servicing institution.
           * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
           */
          SecondaryIdentification?: string;
        };
        /**
         * Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction.
         */
        CreditorAccount: {
          /**
           * Name of the identification scheme, in a coded form as published in an external list.
           */
          SchemeName: string;
          /**
           * Identification assigned by an institution to identify an account. This identification is known by the account owner.
           */
          Identification: string;
          /**
           * The account name is the name or names of the account owner(s) represented at an account level.
           * Note, the account name is not the product name or the nickname of the account.
           * OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory.
           */
          Name: string;
          /**
           * This is secondary identification of the account, as assigned by the account servicing institution.
           * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
           */
          SecondaryIdentification?: string;
        };
        /**
         * Information that locates and identifies a specific address, as defined by postal services.
         */
        CreditorPostalAddress?: {
          /**
           * Identifies the nature of the postal address.
           */
          AddressType?:
            | "Business"
            | "Correspondence"
            | "DeliveryTo"
            | "MailTo"
            | "POBox"
            | "Postal"
            | "Residential"
            | "Statement";
          /**
           * Identification of a division of a large organisation or building.
           */
          Department?: string;
          /**
           * Identification of a sub-division of a large organisation or building.
           */
          SubDepartment?: string;
          /**
           * Name of a street or thoroughfare.
           */
          StreetName?: string;
          /**
           * Number that identifies the position of a building on a street.
           */
          BuildingNumber?: string;
          /**
           * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
           */
          PostCode?: string;
          /**
           * Name of a built-up area, with defined boundaries, and a local government.
           */
          TownName?: string;
          /**
           * Identifies a subdivision of a country such as state, region, county.
           */
          CountrySubDivision?: string;
          /**
           * Nation with its own government.
           */
          Country?: string; // ^[A-Z]{2,2}$
          AddressLine?: string[];
        };
        /**
         * Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system.
         */
        RemittanceInformation?: {
          /**
           * Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form.
           */
          Unstructured?: string;
          /**
           * Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction.
           * Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money.
           * If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification.
           * OB: The Faster Payments Scheme can only accept 18 characters for the ReferenceInformation field - which is where this ISO field will be mapped.
           */
          Reference?: string;
        };
        /**
         * Additional information that can not be captured in the structured fields and/or any other specific block.
         */
        SupplementaryData?: unknown;
      };
      /**
       * The authorisation type request from the TPP.
       */
      Authorisation?: {
        /**
         * Type of authorisation flow requested.
         */
        AuthorisationType: "Any" | "Single";
        /**
         * Date and time at which the requested authorisation flow must be completed.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        CompletionDateTime?: string; // date-time
      };
      /**
       * Supporting Data provided by TPP, when requesting SCA Exemption.
       */
      SCASupportData?: {
        /**
         * This field allows a PISP to request specific SCA Exemption for a Payment Initiation
         */
        RequestedSCAExemptionType?:
          | "BillPayment"
          | "ContactlessTravel"
          | "EcommerceGoods"
          | "EcommerceServices"
          | "Kiosk"
          | "Parking"
          | "PartyToParty";
        /**
         * Specifies a character string with a maximum length of 40 characters.
         * Usage: This field indicates whether the PSU was subject to SCA performed by the TPP
         */
        AppliedAuthenticationApproach?: "CA" | "SCA";
        /**
         * Specifies a character string with a maximum length of 140 characters.
         * Usage: If the payment is recurring then the transaction identifier of the previous payment occurrence so that the ASPSP can verify that the PISP, amount and the payee are the same as the previous occurrence.
         */
        ReferencePaymentOrderId?: string;
      };
    }
    /**
     * The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments.
     */
    export interface Model23 {
      /**
       * Specifies the payment context
       */
      PaymentContextCode?:
        | "BillPayment"
        | "EcommerceGoods"
        | "EcommerceServices"
        | "Other"
        | "PartyToParty";
      /**
       * Category code conform to ISO 18245, related to the type of services or goods the merchant provides for the transaction.
       */
      MerchantCategoryCode?: string;
      /**
       * The unique customer identifier of the PSU with the merchant.
       */
      MerchantCustomerIdentification?: string;
      /**
       * Information that locates and identifies a specific address, as defined by postal services or in free format text.
       */
      DeliveryAddress?: {
        AddressLine?: string[];
        /**
         * Name of a street or thoroughfare.
         */
        StreetName?: string;
        /**
         * Number that identifies the position of a building on a street.
         */
        BuildingNumber?: string;
        /**
         * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
         */
        PostCode?: string;
        /**
         * Name of a built-up area, with defined boundaries, and a local government.
         */
        TownName: string;
        /**
         * Identifies a subdivision of a country such as state, region, county.
         */
        CountrySubDivision?: string;
        /**
         * Nation with its own government, occupying a particular territory.
         */
        Country: string; // ^[A-Z]{2,2}$
      };
    }
    export interface Model24 {
      /**
       * Specified date and time the funds confirmation authorisation will expire.
       *  If this is not populated, the authorisation will be open ended.All dates in the JSON payloads are represented in ISO 8601 date-time format.
       * All date-time fields in responses must include the timezone. An example is below:
       * 2017-04-05T10:43:07+00:00
       */
      ExpirationDateTime?: string; // date-time
      /**
       * Unambiguous identification of the account of the debtor to which a confirmation of funds consent will be applied.
       */
      DebtorAccount: {
        /**
         * Name of the identification scheme, in a coded form as published in an external list.
         */
        SchemeName: string;
        /**
         * Identification assigned by an institution to identify an account. This identification is known by the account owner.
         */
        Identification: string;
        /**
         * Name of the account, as assigned by the account servicing institution.
         * Usage: The account name is the name or names of the account owner(s) represented at an account level. The account name is not the product name or the nickname of the account.
         */
        Name?: string;
        /**
         * This is secondary identification of the account, as assigned by the account servicing institution.
         * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
         */
        SecondaryIdentification?: string;
      };
    }
    export interface Model25 {
      /**
       * Unique reference, as assigned by the CBPII, to unambiguously refer to the request related to the payment transaction.
       */
      Reference: string;
      /**
       * Amount of money to be confirmed as available funds in the debtor account. Contains an Amount and a Currency.
       */
      InstructedAmount: {
        /**
         * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
         */
        Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
        /**
         * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
         */
        Currency: string; // ^[A-Z]{3,3}$
      };
    }
    export interface Model26 {
      /**
       * Unique identification as assigned by the ASPSP to uniquely identify the funds confirmation resource.
       */
      FundsConfirmationId: string;
      /**
       * Unique identification as assigned by the ASPSP to uniquely identify the funds confirmation consent resource.
       */
      ConsentId: string;
      /**
       * Date and time at which the resource was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
       * All date-time fields in responses must include the timezone. An example is below:
       * 2017-04-05T10:43:07+00:00
       */
      CreationDateTime: string; // date-time
      /**
       * Flag to indicate the result of a confirmation of funds check.
       */
      FundsAvailable: boolean;
      /**
       * Unique reference, as assigned by the CBPII, to unambiguously refer to the request related to the payment transaction.
       */
      Reference: string;
      /**
       * Amount of money to be confirmed as available funds in the debtor account. Contains an Amount and a Currency.
       */
      InstructedAmount: {
        /**
         * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
         */
        Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
        /**
         * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
         */
        Currency: string; // ^[A-Z]{3,3}$
      };
    }
    export interface Model27 {
      ScheduleId: string;
      JobId: "REFRESH_PENDING_PAYMENTS" | "REFRESH_ACCOUNTS";
      Description?: string;
      /**
       * **Cron** expression that determines when the job should run. The supported format is described [here](https://github.com/harrisiirak/cron-parser)
       */
      ScheduleExpression: string;
      /**
       * Status of the job schedule. Only active jobs will trigger job executions.
       */
      Status: "Active" | "Inactive";
      /**
       * Time when this job will be executed next
       * example:
       * 2021-01-01T08:00:00Z
       */
      NextExecutionDateTime?: string;
      /**
       * Time when this job was executed last
       * example:
       * 2021-01-01T08:00:00Z
       */
      LastExecutionDateTime?: string;
      LastExecutionStatus?: "In progress" | "Success" | "Failure";
      Links?: {
        /**
         * Fetches previous executions of this job
         */
        Executions: string;
      };
    }
    export interface Model28 {
      Data: {
        VerificationReport: {
          /**
           * Whether the name was matched
           */
          Matched: boolean;
          /**
           * Code of the reason why the match was **not** successful
           */
          ReasonCode?:
            | "ANNM"
            | "MBAM"
            | "BANM"
            | "PANM"
            | "BAMM"
            | "PAMM"
            | "AC01"
            | "IVCR"
            | "ACNS"
            | "OPTO"
            | "CASS"
            | "SCNS";
          /**
           * Name of possible match, if applicable according to `ReasonCode`
           */
          Name?: string;
        };
      };
    }
    export interface Model3 {
      /**
       * OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource.
       */
      ConsentId: string;
      /**
       * Date and time at which the resource was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
       * All date-time fields in responses must include the timezone. An example is below:
       * 2017-04-05T10:43:07+00:00
       */
      CreationDateTime: string; // date-time
      /**
       * Specifies the status of consent resource in code form.
       */
      Status: "Authorised" | "AwaitingAuthorisation" | "Consumed" | "Rejected";
      /**
       * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
       * All date-time fields in responses must include the timezone. An example is below:
       * 2017-04-05T10:43:07+00:00
       */
      StatusUpdateDateTime: string; // date-time
      /**
       * Specifies to share the refund account details with PISP
       */
      ReadRefundAccount?: "No" | "Yes";
      /**
       * Specified cut-off date and time for the payment consent.All dates in the JSON payloads are represented in ISO 8601 date-time format.
       * All date-time fields in responses must include the timezone. An example is below:
       * 2017-04-05T10:43:07+00:00
       */
      CutOffDateTime?: string; // date-time
      /**
       * Expected execution date and time for the payment resource.All dates in the JSON payloads are represented in ISO 8601 date-time format.
       * All date-time fields in responses must include the timezone. An example is below:
       * 2017-04-05T10:43:07+00:00
       */
      ExpectedExecutionDateTime?: string; // date-time
      /**
       * Expected settlement date and time for the payment resource.All dates in the JSON payloads are represented in ISO 8601 date-time format.
       * All date-time fields in responses must include the timezone. An example is below:
       * 2017-04-05T10:43:07+00:00
       */
      ExpectedSettlementDateTime?: string; // date-time
      Charges?: {
        /**
         * Specifies which party/parties will bear the charges associated with the processing of the payment transaction.
         */
        ChargeBearer:
          | "BorneByCreditor"
          | "BorneByDebtor"
          | "FollowingServiceLevel"
          | "Shared";
        /**
         * Charge type, in a coded form.
         */
        Type: string;
        /**
         * Amount of money associated with the charge type.
         */
        Amount: {
          /**
           * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
           */
          Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
          /**
           * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
           */
          Currency: string; // ^[A-Z]{3,3}$
        };
      }[];
      /**
       * The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single domestic payment.
       */
      Initiation: {
        /**
         * Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction.
         * Usage: the  instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction.
         */
        InstructionIdentification: string;
        /**
         * Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain.
         * Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction.
         * OB: The Faster Payments Scheme can only access 31 characters for the EndToEndIdentification field.
         */
        EndToEndIdentification: string;
        /**
         * User community specific instrument.
         * Usage: This element is used to specify a local instrument, local clearing option and/or further qualify the service or service level.
         */
        LocalInstrument?: string;
        /**
         * Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party.
         * Usage: This amount has to be transported unchanged through the transaction chain.
         */
        InstructedAmount: {
          /**
           * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
           */
          Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
          /**
           * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
           */
          Currency: string; // ^[A-Z]{3,3}$
        };
        /**
         * Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction.
         */
        DebtorAccount?: {
          /**
           * Name of the identification scheme, in a coded form as published in an external list.
           */
          SchemeName: string;
          /**
           * Identification assigned by an institution to identify an account. This identification is known by the account owner.
           */
          Identification: string;
          /**
           * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
           * Note, the account name is not the product name or the nickname of the account.
           */
          Name?: string;
          /**
           * This is secondary identification of the account, as assigned by the account servicing institution.
           * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
           */
          SecondaryIdentification?: string;
        };
        /**
         * Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction.
         */
        CreditorAccount: {
          /**
           * Name of the identification scheme, in a coded form as published in an external list.
           */
          SchemeName: string;
          /**
           * Identification assigned by an institution to identify an account. This identification is known by the account owner.
           */
          Identification: string;
          /**
           * The account name is the name or names of the account owner(s) represented at an account level.
           * Note, the account name is not the product name or the nickname of the account.
           * OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory.
           */
          Name: string;
          /**
           * This is secondary identification of the account, as assigned by the account servicing institution.
           * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
           */
          SecondaryIdentification?: string;
        };
        /**
         * Information that locates and identifies a specific address, as defined by postal services.
         */
        CreditorPostalAddress?: {
          /**
           * Identifies the nature of the postal address.
           */
          AddressType?:
            | "Business"
            | "Correspondence"
            | "DeliveryTo"
            | "MailTo"
            | "POBox"
            | "Postal"
            | "Residential"
            | "Statement";
          /**
           * Identification of a division of a large organisation or building.
           */
          Department?: string;
          /**
           * Identification of a sub-division of a large organisation or building.
           */
          SubDepartment?: string;
          /**
           * Name of a street or thoroughfare.
           */
          StreetName?: string;
          /**
           * Number that identifies the position of a building on a street.
           */
          BuildingNumber?: string;
          /**
           * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
           */
          PostCode?: string;
          /**
           * Name of a built-up area, with defined boundaries, and a local government.
           */
          TownName?: string;
          /**
           * Identifies a subdivision of a country such as state, region, county.
           */
          CountrySubDivision?: string;
          /**
           * Nation with its own government.
           */
          Country?: string; // ^[A-Z]{2,2}$
          AddressLine?: string[];
        };
        /**
         * Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system.
         */
        RemittanceInformation?: {
          /**
           * Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form.
           */
          Unstructured?: string;
          /**
           * Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction.
           * Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money.
           * If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification.
           * OB: The Faster Payments Scheme can only accept 18 characters for the ReferenceInformation field - which is where this ISO field will be mapped.
           */
          Reference?: string;
        };
        /**
         * Additional information that can not be captured in the structured fields and/or any other specific block.
         */
        SupplementaryData?: unknown;
      };
      /**
       * The authorisation type request from the TPP.
       */
      Authorisation?: {
        /**
         * Type of authorisation flow requested.
         */
        AuthorisationType: "Any" | "Single";
        /**
         * Date and time at which the requested authorisation flow must be completed.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        CompletionDateTime?: string; // date-time
      };
      /**
       * Supporting Data provided by TPP, when requesting SCA Exemption.
       */
      SCASupportData?: {
        /**
         * This field allows a PISP to request specific SCA Exemption for a Payment Initiation
         */
        RequestedSCAExemptionType?:
          | "BillPayment"
          | "ContactlessTravel"
          | "EcommerceGoods"
          | "EcommerceServices"
          | "Kiosk"
          | "Parking"
          | "PartyToParty";
        /**
         * Specifies a character string with a maximum length of 40 characters.
         * Usage: This field indicates whether the PSU was subject to SCA performed by the TPP
         */
        AppliedAuthenticationApproach?: "CA" | "SCA";
        /**
         * Specifies a character string with a maximum length of 140 characters.
         * Usage: If the payment is recurring then the transaction identifier of the previous payment occurrence so that the ASPSP can verify that the PISP, amount and the payee are the same as the previous occurrence.
         */
        ReferencePaymentOrderId?: string;
      };
      /**
       * Set of elements used to identify a person or an organisation.
       */
      Debtor?: {
        /**
         * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account.
         */
        Name?: string;
      };
    }
    /**
     * The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments.
     */
    export interface Model4 {
      /**
       * Specifies the payment context
       */
      PaymentContextCode?:
        | "BillPayment"
        | "EcommerceGoods"
        | "EcommerceServices"
        | "Other"
        | "PartyToParty";
      /**
       * Category code conform to ISO 18245, related to the type of services or goods the merchant provides for the transaction.
       */
      MerchantCategoryCode?: string;
      /**
       * The unique customer identifier of the PSU with the merchant.
       */
      MerchantCustomerIdentification?: string;
      /**
       * Information that locates and identifies a specific address, as defined by postal services or in free format text.
       */
      DeliveryAddress?: {
        AddressLine?: string[];
        /**
         * Name of a street or thoroughfare.
         */
        StreetName?: string;
        /**
         * Number that identifies the position of a building on a street.
         */
        BuildingNumber?: string;
        /**
         * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
         */
        PostCode?: string;
        /**
         * Name of a built-up area, with defined boundaries, and a local government.
         */
        TownName: string;
        /**
         * Identifies a subdivision of a country such as state, region, county.
         */
        CountrySubDivision?: string;
        /**
         * Nation with its own government, occupying a particular territory.
         */
        Country: string; // ^[A-Z]{2,2}$
      };
    }
    export type Model5 = {
      ConsentId: string;
      ConsentType: "DomesticPayment";
      Resource: {
        Data: {
          /**
           * OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource.
           */
          ConsentId: string;
          /**
           * Date and time at which the resource was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          CreationDateTime: string; // date-time
          /**
           * Specifies the status of consent resource in code form.
           */
          Status:
            | "Authorised"
            | "AwaitingAuthorisation"
            | "Consumed"
            | "Rejected";
          /**
           * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          StatusUpdateDateTime: string; // date-time
          /**
           * Specifies to share the refund account details with PISP
           */
          ReadRefundAccount?: "No" | "Yes";
          /**
           * Specified cut-off date and time for the payment consent.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          CutOffDateTime?: string; // date-time
          /**
           * Expected execution date and time for the payment resource.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          ExpectedExecutionDateTime?: string; // date-time
          /**
           * Expected settlement date and time for the payment resource.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          ExpectedSettlementDateTime?: string; // date-time
          Charges?: {
            /**
             * Specifies which party/parties will bear the charges associated with the processing of the payment transaction.
             */
            ChargeBearer:
              | "BorneByCreditor"
              | "BorneByDebtor"
              | "FollowingServiceLevel"
              | "Shared";
            /**
             * Charge type, in a coded form.
             */
            Type: string;
            /**
             * Amount of money associated with the charge type.
             */
            Amount: {
              /**
               * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
               */
              Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
              /**
               * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
               */
              Currency: string; // ^[A-Z]{3,3}$
            };
          }[];
          /**
           * The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single domestic payment.
           */
          Initiation: {
            /**
             * Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction.
             * Usage: the  instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction.
             */
            InstructionIdentification: string;
            /**
             * Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain.
             * Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction.
             * OB: The Faster Payments Scheme can only access 31 characters for the EndToEndIdentification field.
             */
            EndToEndIdentification: string;
            /**
             * User community specific instrument.
             * Usage: This element is used to specify a local instrument, local clearing option and/or further qualify the service or service level.
             */
            LocalInstrument?: string;
            /**
             * Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party.
             * Usage: This amount has to be transported unchanged through the transaction chain.
             */
            InstructedAmount: {
              /**
               * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
               */
              Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
              /**
               * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
               */
              Currency: string; // ^[A-Z]{3,3}$
            };
            /**
             * Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction.
             */
            DebtorAccount?: {
              /**
               * Name of the identification scheme, in a coded form as published in an external list.
               */
              SchemeName: string;
              /**
               * Identification assigned by an institution to identify an account. This identification is known by the account owner.
               */
              Identification: string;
              /**
               * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
               * Note, the account name is not the product name or the nickname of the account.
               */
              Name?: string;
              /**
               * This is secondary identification of the account, as assigned by the account servicing institution.
               * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
               */
              SecondaryIdentification?: string;
            };
            /**
             * Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction.
             */
            CreditorAccount: {
              /**
               * Name of the identification scheme, in a coded form as published in an external list.
               */
              SchemeName: string;
              /**
               * Identification assigned by an institution to identify an account. This identification is known by the account owner.
               */
              Identification: string;
              /**
               * The account name is the name or names of the account owner(s) represented at an account level.
               * Note, the account name is not the product name or the nickname of the account.
               * OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory.
               */
              Name: string;
              /**
               * This is secondary identification of the account, as assigned by the account servicing institution.
               * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
               */
              SecondaryIdentification?: string;
            };
            /**
             * Information that locates and identifies a specific address, as defined by postal services.
             */
            CreditorPostalAddress?: {
              /**
               * Identifies the nature of the postal address.
               */
              AddressType?:
                | "Business"
                | "Correspondence"
                | "DeliveryTo"
                | "MailTo"
                | "POBox"
                | "Postal"
                | "Residential"
                | "Statement";
              /**
               * Identification of a division of a large organisation or building.
               */
              Department?: string;
              /**
               * Identification of a sub-division of a large organisation or building.
               */
              SubDepartment?: string;
              /**
               * Name of a street or thoroughfare.
               */
              StreetName?: string;
              /**
               * Number that identifies the position of a building on a street.
               */
              BuildingNumber?: string;
              /**
               * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
               */
              PostCode?: string;
              /**
               * Name of a built-up area, with defined boundaries, and a local government.
               */
              TownName?: string;
              /**
               * Identifies a subdivision of a country such as state, region, county.
               */
              CountrySubDivision?: string;
              /**
               * Nation with its own government.
               */
              Country?: string; // ^[A-Z]{2,2}$
              AddressLine?: string[];
            };
            /**
             * Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system.
             */
            RemittanceInformation?: {
              /**
               * Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form.
               */
              Unstructured?: string;
              /**
               * Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction.
               * Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money.
               * If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification.
               * OB: The Faster Payments Scheme can only accept 18 characters for the ReferenceInformation field - which is where this ISO field will be mapped.
               */
              Reference?: string;
            };
            /**
             * Additional information that can not be captured in the structured fields and/or any other specific block.
             */
            SupplementaryData?: unknown;
          };
          /**
           * The authorisation type request from the TPP.
           */
          Authorisation?: {
            /**
             * Type of authorisation flow requested.
             */
            AuthorisationType: "Any" | "Single";
            /**
             * Date and time at which the requested authorisation flow must be completed.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            CompletionDateTime?: string; // date-time
          };
          /**
           * Supporting Data provided by TPP, when requesting SCA Exemption.
           */
          SCASupportData?: {
            /**
             * This field allows a PISP to request specific SCA Exemption for a Payment Initiation
             */
            RequestedSCAExemptionType?:
              | "BillPayment"
              | "ContactlessTravel"
              | "EcommerceGoods"
              | "EcommerceServices"
              | "Kiosk"
              | "Parking"
              | "PartyToParty";
            /**
             * Specifies a character string with a maximum length of 40 characters.
             * Usage: This field indicates whether the PSU was subject to SCA performed by the TPP
             */
            AppliedAuthenticationApproach?: "CA" | "SCA";
            /**
             * Specifies a character string with a maximum length of 140 characters.
             * Usage: If the payment is recurring then the transaction identifier of the previous payment occurrence so that the ASPSP can verify that the PISP, amount and the payee are the same as the previous occurrence.
             */
            ReferencePaymentOrderId?: string;
          };
          /**
           * Set of elements used to identify a person or an organisation.
           */
          Debtor?: {
            /**
             * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account.
             */
            Name?: string;
          };
        };
        /**
         * The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments.
         */
        Risk: {
          /**
           * Specifies the payment context
           */
          PaymentContextCode?:
            | "BillPayment"
            | "EcommerceGoods"
            | "EcommerceServices"
            | "Other"
            | "PartyToParty";
          /**
           * Category code conform to ISO 18245, related to the type of services or goods the merchant provides for the transaction.
           */
          MerchantCategoryCode?: string;
          /**
           * The unique customer identifier of the PSU with the merchant.
           */
          MerchantCustomerIdentification?: string;
          /**
           * Information that locates and identifies a specific address, as defined by postal services or in free format text.
           */
          DeliveryAddress?: {
            AddressLine?: string[];
            /**
             * Name of a street or thoroughfare.
             */
            StreetName?: string;
            /**
             * Number that identifies the position of a building on a street.
             */
            BuildingNumber?: string;
            /**
             * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
             */
            PostCode?: string;
            /**
             * Name of a built-up area, with defined boundaries, and a local government.
             */
            TownName: string;
            /**
             * Identifies a subdivision of a country such as state, region, county.
             */
            CountrySubDivision?: string;
            /**
             * Nation with its own government, occupying a particular territory.
             */
            Country: string; // ^[A-Z]{2,2}$
          };
        };
      };
      Partnership?: {
        PartnershipId: string;
        CustomerFriendlyName: string;
        CustomerFriendlyLogoUri?: string;
      };
      /**
       * Tags associated with the resource
       */
      Tags?: string[];
    }[];
    export interface Model6 {
      /**
       * OB: Unique identification as assigned by the ASPSP to uniquely identify the domestic payment resource.
       */
      DomesticPaymentId: string;
      /**
       * OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource.
       */
      ConsentId: string;
      /**
       * Date and time at which the message was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
       * All date-time fields in responses must include the timezone. An example is below:
       * 2017-04-05T10:43:07+00:00
       */
      CreationDateTime: string; // date-time
      /**
       * Specifies the status of the payment information group.
       */
      Status:
        | "AcceptedCreditSettlementCompleted"
        | "AcceptedSettlementCompleted"
        | "AcceptedSettlementInProcess"
        | "AcceptedWithoutPosting"
        | "Pending"
        | "Rejected";
      /**
       * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
       * All date-time fields in responses must include the timezone. An example is below:
       * 2017-04-05T10:43:07+00:00
       */
      StatusUpdateDateTime: string; // date-time
      /**
       * Expected execution date and time for the payment resource.All dates in the JSON payloads are represented in ISO 8601 date-time format.
       * All date-time fields in responses must include the timezone. An example is below:
       * 2017-04-05T10:43:07+00:00
       */
      ExpectedExecutionDateTime?: string; // date-time
      /**
       * Expected settlement date and time for the payment resource.All dates in the JSON payloads are represented in ISO 8601 date-time format.
       * All date-time fields in responses must include the timezone. An example is below:
       * 2017-04-05T10:43:07+00:00
       */
      ExpectedSettlementDateTime?: string; // date-time
      /**
       * Unambiguous identification of the refund account to which a refund will be made as a result of the transaction.
       */
      Refund?: {
        /**
         * Provides the details to identify an account.
         */
        Account: {
          /**
           * Name of the identification scheme, in a coded form as published in an external list.
           */
          SchemeName: string;
          /**
           * Identification assigned by an institution to identify an account. This identification is known by the account owner.
           */
          Identification: string;
          /**
           * Name of the account, as assigned by the account servicing institution.
           * Usage: The account name is the name or names of the account owner(s) represented at an account level. The account name is not the product name or the nickname of the account.
           * OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory.
           */
          Name: string;
          /**
           * This is secondary identification of the account, as assigned by the account servicing institution.
           * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
           */
          SecondaryIdentification?: string;
        };
      };
      Charges?: {
        /**
         * Specifies which party/parties will bear the charges associated with the processing of the payment transaction.
         */
        ChargeBearer:
          | "BorneByCreditor"
          | "BorneByDebtor"
          | "FollowingServiceLevel"
          | "Shared";
        /**
         * Charge type, in a coded form.
         */
        Type: string;
        /**
         * Amount of money associated with the charge type.
         */
        Amount: {
          /**
           * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
           */
          Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
          /**
           * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
           */
          Currency: string; // ^[A-Z]{3,3}$
        };
      }[];
      /**
       * The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single domestic payment.
       */
      Initiation: {
        /**
         * Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction.
         * Usage: the  instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction.
         */
        InstructionIdentification: string;
        /**
         * Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain.
         * Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction.
         * OB: The Faster Payments Scheme can only access 31 characters for the EndToEndIdentification field.
         */
        EndToEndIdentification: string;
        /**
         * User community specific instrument.
         * Usage: This element is used to specify a local instrument, local clearing option and/or further qualify the service or service level.
         */
        LocalInstrument?: string;
        /**
         * Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party.
         * Usage: This amount has to be transported unchanged through the transaction chain.
         */
        InstructedAmount: {
          /**
           * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
           */
          Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
          /**
           * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
           */
          Currency: string; // ^[A-Z]{3,3}$
        };
        /**
         * Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction.
         */
        DebtorAccount?: {
          /**
           * Name of the identification scheme, in a coded form as published in an external list.
           */
          SchemeName: string;
          /**
           * Identification assigned by an institution to identify an account. This identification is known by the account owner.
           */
          Identification: string;
          /**
           * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
           * Note, the account name is not the product name or the nickname of the account.
           */
          Name?: string;
          /**
           * This is secondary identification of the account, as assigned by the account servicing institution.
           * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
           */
          SecondaryIdentification?: string;
        };
        /**
         * Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction.
         */
        CreditorAccount: {
          /**
           * Name of the identification scheme, in a coded form as published in an external list.
           */
          SchemeName: string;
          /**
           * Identification assigned by an institution to identify an account. This identification is known by the account owner.
           */
          Identification: string;
          /**
           * The account name is the name or names of the account owner(s) represented at an account level.
           * Note, the account name is not the product name or the nickname of the account.
           * OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory.
           */
          Name: string;
          /**
           * This is secondary identification of the account, as assigned by the account servicing institution.
           * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
           */
          SecondaryIdentification?: string;
        };
        /**
         * Information that locates and identifies a specific address, as defined by postal services.
         */
        CreditorPostalAddress?: {
          /**
           * Identifies the nature of the postal address.
           */
          AddressType?:
            | "Business"
            | "Correspondence"
            | "DeliveryTo"
            | "MailTo"
            | "POBox"
            | "Postal"
            | "Residential"
            | "Statement";
          /**
           * Identification of a division of a large organisation or building.
           */
          Department?: string;
          /**
           * Identification of a sub-division of a large organisation or building.
           */
          SubDepartment?: string;
          /**
           * Name of a street or thoroughfare.
           */
          StreetName?: string;
          /**
           * Number that identifies the position of a building on a street.
           */
          BuildingNumber?: string;
          /**
           * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
           */
          PostCode?: string;
          /**
           * Name of a built-up area, with defined boundaries, and a local government.
           */
          TownName?: string;
          /**
           * Identifies a subdivision of a country such as state, region, county.
           */
          CountrySubDivision?: string;
          /**
           * Nation with its own government.
           */
          Country?: string; // ^[A-Z]{2,2}$
          AddressLine?: string[];
        };
        /**
         * Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system.
         */
        RemittanceInformation?: {
          /**
           * Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form.
           */
          Unstructured?: string;
          /**
           * Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction.
           * Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money.
           * If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification.
           * OB: The Faster Payments Scheme can only accept 18 characters for the ReferenceInformation field - which is where this ISO field will be mapped.
           */
          Reference?: string;
        };
        /**
         * Additional information that can not be captured in the structured fields and/or any other specific block.
         */
        SupplementaryData?: unknown;
      };
      /**
       * The multiple authorisation flow response from the ASPSP.
       */
      MultiAuthorisation?: {
        /**
         * Specifies the status of the authorisation flow in code form.
         */
        Status: "Authorised" | "AwaitingFurtherAuthorisation" | "Rejected";
        /**
         * Number of authorisations required for payment order (total required at the start of the multi authorisation journey).
         */
        NumberRequired?: number;
        /**
         * Number of authorisations received.
         */
        NumberReceived?: number;
        /**
         * Last date and time at the authorisation flow was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        LastUpdateDateTime?: string; // date-time
        /**
         * Date and time at which the requested authorisation flow must be completed.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        ExpirationDateTime?: string; // date-time
      };
      /**
       * Set of elements used to identify a person or an organisation.
       */
      Debtor?: {
        /**
         * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account.
         */
        Name?: string;
      };
    }
    export type Model7 = {
      PaymentId: string;
      PaymentType: "DomesticPayment";
      Resource: {
        Data: {
          /**
           * OB: Unique identification as assigned by the ASPSP to uniquely identify the domestic payment resource.
           */
          DomesticPaymentId: string;
          /**
           * OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource.
           */
          ConsentId: string;
          /**
           * Date and time at which the message was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          CreationDateTime: string; // date-time
          /**
           * Specifies the status of the payment information group.
           */
          Status:
            | "AcceptedCreditSettlementCompleted"
            | "AcceptedSettlementCompleted"
            | "AcceptedSettlementInProcess"
            | "AcceptedWithoutPosting"
            | "Pending"
            | "Rejected";
          /**
           * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          StatusUpdateDateTime: string; // date-time
          /**
           * Expected execution date and time for the payment resource.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          ExpectedExecutionDateTime?: string; // date-time
          /**
           * Expected settlement date and time for the payment resource.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          ExpectedSettlementDateTime?: string; // date-time
          /**
           * Unambiguous identification of the refund account to which a refund will be made as a result of the transaction.
           */
          Refund?: {
            /**
             * Provides the details to identify an account.
             */
            Account: {
              /**
               * Name of the identification scheme, in a coded form as published in an external list.
               */
              SchemeName: string;
              /**
               * Identification assigned by an institution to identify an account. This identification is known by the account owner.
               */
              Identification: string;
              /**
               * Name of the account, as assigned by the account servicing institution.
               * Usage: The account name is the name or names of the account owner(s) represented at an account level. The account name is not the product name or the nickname of the account.
               * OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory.
               */
              Name: string;
              /**
               * This is secondary identification of the account, as assigned by the account servicing institution.
               * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
               */
              SecondaryIdentification?: string;
            };
          };
          Charges?: {
            /**
             * Specifies which party/parties will bear the charges associated with the processing of the payment transaction.
             */
            ChargeBearer:
              | "BorneByCreditor"
              | "BorneByDebtor"
              | "FollowingServiceLevel"
              | "Shared";
            /**
             * Charge type, in a coded form.
             */
            Type: string;
            /**
             * Amount of money associated with the charge type.
             */
            Amount: {
              /**
               * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
               */
              Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
              /**
               * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
               */
              Currency: string; // ^[A-Z]{3,3}$
            };
          }[];
          /**
           * The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single domestic payment.
           */
          Initiation: {
            /**
             * Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction.
             * Usage: the  instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction.
             */
            InstructionIdentification: string;
            /**
             * Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain.
             * Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction.
             * OB: The Faster Payments Scheme can only access 31 characters for the EndToEndIdentification field.
             */
            EndToEndIdentification: string;
            /**
             * User community specific instrument.
             * Usage: This element is used to specify a local instrument, local clearing option and/or further qualify the service or service level.
             */
            LocalInstrument?: string;
            /**
             * Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party.
             * Usage: This amount has to be transported unchanged through the transaction chain.
             */
            InstructedAmount: {
              /**
               * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
               */
              Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
              /**
               * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
               */
              Currency: string; // ^[A-Z]{3,3}$
            };
            /**
             * Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction.
             */
            DebtorAccount?: {
              /**
               * Name of the identification scheme, in a coded form as published in an external list.
               */
              SchemeName: string;
              /**
               * Identification assigned by an institution to identify an account. This identification is known by the account owner.
               */
              Identification: string;
              /**
               * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
               * Note, the account name is not the product name or the nickname of the account.
               */
              Name?: string;
              /**
               * This is secondary identification of the account, as assigned by the account servicing institution.
               * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
               */
              SecondaryIdentification?: string;
            };
            /**
             * Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction.
             */
            CreditorAccount: {
              /**
               * Name of the identification scheme, in a coded form as published in an external list.
               */
              SchemeName: string;
              /**
               * Identification assigned by an institution to identify an account. This identification is known by the account owner.
               */
              Identification: string;
              /**
               * The account name is the name or names of the account owner(s) represented at an account level.
               * Note, the account name is not the product name or the nickname of the account.
               * OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory.
               */
              Name: string;
              /**
               * This is secondary identification of the account, as assigned by the account servicing institution.
               * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
               */
              SecondaryIdentification?: string;
            };
            /**
             * Information that locates and identifies a specific address, as defined by postal services.
             */
            CreditorPostalAddress?: {
              /**
               * Identifies the nature of the postal address.
               */
              AddressType?:
                | "Business"
                | "Correspondence"
                | "DeliveryTo"
                | "MailTo"
                | "POBox"
                | "Postal"
                | "Residential"
                | "Statement";
              /**
               * Identification of a division of a large organisation or building.
               */
              Department?: string;
              /**
               * Identification of a sub-division of a large organisation or building.
               */
              SubDepartment?: string;
              /**
               * Name of a street or thoroughfare.
               */
              StreetName?: string;
              /**
               * Number that identifies the position of a building on a street.
               */
              BuildingNumber?: string;
              /**
               * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
               */
              PostCode?: string;
              /**
               * Name of a built-up area, with defined boundaries, and a local government.
               */
              TownName?: string;
              /**
               * Identifies a subdivision of a country such as state, region, county.
               */
              CountrySubDivision?: string;
              /**
               * Nation with its own government.
               */
              Country?: string; // ^[A-Z]{2,2}$
              AddressLine?: string[];
            };
            /**
             * Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system.
             */
            RemittanceInformation?: {
              /**
               * Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form.
               */
              Unstructured?: string;
              /**
               * Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction.
               * Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money.
               * If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification.
               * OB: The Faster Payments Scheme can only accept 18 characters for the ReferenceInformation field - which is where this ISO field will be mapped.
               */
              Reference?: string;
            };
            /**
             * Additional information that can not be captured in the structured fields and/or any other specific block.
             */
            SupplementaryData?: unknown;
          };
          /**
           * The multiple authorisation flow response from the ASPSP.
           */
          MultiAuthorisation?: {
            /**
             * Specifies the status of the authorisation flow in code form.
             */
            Status: "Authorised" | "AwaitingFurtherAuthorisation" | "Rejected";
            /**
             * Number of authorisations required for payment order (total required at the start of the multi authorisation journey).
             */
            NumberRequired?: number;
            /**
             * Number of authorisations received.
             */
            NumberReceived?: number;
            /**
             * Last date and time at the authorisation flow was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            LastUpdateDateTime?: string; // date-time
            /**
             * Date and time at which the requested authorisation flow must be completed.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            ExpirationDateTime?: string; // date-time
          };
          /**
           * Set of elements used to identify a person or an organisation.
           */
          Debtor?: {
            /**
             * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account.
             */
            Name?: string;
          };
        };
      };
      /**
       * Tags associated with the resource
       */
      Tags?: string[];
    }[];
    export interface Model8 {
      /**
       * Unique identification as assigned to identify the funds confirmation consent resource.
       */
      ConsentId: string;
      /**
       * Date and time at which the resource was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
       * All date-time fields in responses must include the timezone. An example is below:
       * 2017-04-05T10:43:07+00:00
       */
      CreationDateTime: string; // date-time
      /**
       * Specifies the status of consent resource in code form.
       */
      Status: "Authorised" | "AwaitingAuthorisation" | "Rejected" | "Revoked";
      /**
       * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
       * All date-time fields in responses must include the timezone. An example is below:
       * 2017-04-05T10:43:07+00:00
       */
      StatusUpdateDateTime: string; // date-time
      /**
       * Specified date and time the funds confirmation authorisation will expire.
       * If this is not populated, the authorisation will be open ended.All dates in the JSON payloads are represented in ISO 8601 date-time format.
       * All date-time fields in responses must include the timezone. An example is below:
       * 2017-04-05T10:43:07+00:00
       */
      ExpirationDateTime?: string; // date-time
      /**
       * Unambiguous identification of the account of the debtor to which a confirmation of funds consent will be applied.
       */
      DebtorAccount: {
        /**
         * Name of the identification scheme, in a coded form as published in an external list.
         */
        SchemeName: string;
        /**
         * Identification assigned by an institution to identify an account. This identification is known by the account owner.
         */
        Identification: string;
        /**
         * Name of the account, as assigned by the account servicing institution.
         * Usage: The account name is the name or names of the account owner(s) represented at an account level. The account name is not the product name or the nickname of the account.
         */
        Name?: string;
        /**
         * This is secondary identification of the account, as assigned by the account servicing institution.
         * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
         */
        SecondaryIdentification?: string;
      };
    }
    export type Model9 = {
      ConsentId: string;
      ConsentType: "FundsConfirmation";
      Partnership: {
        PartnershipId: string;
        CustomerFriendlyName: string;
        CustomerFriendlyLogoUri?: string;
      };
      Resource: {
        Data: {
          /**
           * Unique identification as assigned to identify the funds confirmation consent resource.
           */
          ConsentId: string;
          /**
           * Date and time at which the resource was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          CreationDateTime: string; // date-time
          /**
           * Specifies the status of consent resource in code form.
           */
          Status:
            | "Authorised"
            | "AwaitingAuthorisation"
            | "Rejected"
            | "Revoked";
          /**
           * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          StatusUpdateDateTime: string; // date-time
          /**
           * Specified date and time the funds confirmation authorisation will expire.
           * If this is not populated, the authorisation will be open ended.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          ExpirationDateTime?: string; // date-time
          /**
           * Unambiguous identification of the account of the debtor to which a confirmation of funds consent will be applied.
           */
          DebtorAccount: {
            /**
             * Name of the identification scheme, in a coded form as published in an external list.
             */
            SchemeName: string;
            /**
             * Identification assigned by an institution to identify an account. This identification is known by the account owner.
             */
            Identification: string;
            /**
             * Name of the account, as assigned by the account servicing institution.
             * Usage: The account name is the name or names of the account owner(s) represented at an account level. The account name is not the product name or the nickname of the account.
             */
            Name?: string;
            /**
             * This is secondary identification of the account, as assigned by the account servicing institution.
             * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
             */
            SecondaryIdentification?: string;
          };
        };
      };
      /**
       * Tags associated with the resource
       */
      Tags?: string[];
    }[];
    /**
     * Tags to associate with the resource
     */
    export type NewTags = string[];
    export interface PaginationLinks {
      Self: string;
      Next?: string;
      Prev?: string;
    }
    export interface Partnership {
      PartnershipId: string;
      CustomerFriendlyName: string;
      CustomerFriendlyLogoUri?: string;
      SupportedModules: ("ais" | "pis" | "cbpii" | "cop")[];
      Links: {
        CreateAccountAccessConsent?: string;
        CreateDomesticPaymentConsent?: string;
        CreateFundsConfirmationConsent?: string;
        ExecuteNameVerificationRequest?: string;
      };
    }
    export interface PartnershipLinks {
      CreateAccountAccessConsent?: string;
      CreateDomesticPaymentConsent?: string;
      CreateFundsConfirmationConsent?: string;
      ExecuteNameVerificationRequest?: string;
    }
    export interface PartnershipReference {
      PartnershipId: string;
      CustomerFriendlyName: string;
      CustomerFriendlyLogoUri?: string;
    }
    export interface Payment {
      PaymentId: string;
      PaymentType: "DomesticPayment";
      Resource: {
        Data: {
          /**
           * OB: Unique identification as assigned by the ASPSP to uniquely identify the domestic payment resource.
           */
          DomesticPaymentId: string;
          /**
           * OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource.
           */
          ConsentId: string;
          /**
           * Date and time at which the message was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          CreationDateTime: string; // date-time
          /**
           * Specifies the status of the payment information group.
           */
          Status:
            | "AcceptedCreditSettlementCompleted"
            | "AcceptedSettlementCompleted"
            | "AcceptedSettlementInProcess"
            | "AcceptedWithoutPosting"
            | "Pending"
            | "Rejected";
          /**
           * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          StatusUpdateDateTime: string; // date-time
          /**
           * Expected execution date and time for the payment resource.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          ExpectedExecutionDateTime?: string; // date-time
          /**
           * Expected settlement date and time for the payment resource.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          ExpectedSettlementDateTime?: string; // date-time
          /**
           * Unambiguous identification of the refund account to which a refund will be made as a result of the transaction.
           */
          Refund?: {
            /**
             * Provides the details to identify an account.
             */
            Account: {
              /**
               * Name of the identification scheme, in a coded form as published in an external list.
               */
              SchemeName: string;
              /**
               * Identification assigned by an institution to identify an account. This identification is known by the account owner.
               */
              Identification: string;
              /**
               * Name of the account, as assigned by the account servicing institution.
               * Usage: The account name is the name or names of the account owner(s) represented at an account level. The account name is not the product name or the nickname of the account.
               * OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory.
               */
              Name: string;
              /**
               * This is secondary identification of the account, as assigned by the account servicing institution.
               * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
               */
              SecondaryIdentification?: string;
            };
          };
          Charges?: {
            /**
             * Specifies which party/parties will bear the charges associated with the processing of the payment transaction.
             */
            ChargeBearer:
              | "BorneByCreditor"
              | "BorneByDebtor"
              | "FollowingServiceLevel"
              | "Shared";
            /**
             * Charge type, in a coded form.
             */
            Type: string;
            /**
             * Amount of money associated with the charge type.
             */
            Amount: {
              /**
               * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
               */
              Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
              /**
               * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
               */
              Currency: string; // ^[A-Z]{3,3}$
            };
          }[];
          /**
           * The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single domestic payment.
           */
          Initiation: {
            /**
             * Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction.
             * Usage: the  instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction.
             */
            InstructionIdentification: string;
            /**
             * Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain.
             * Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction.
             * OB: The Faster Payments Scheme can only access 31 characters for the EndToEndIdentification field.
             */
            EndToEndIdentification: string;
            /**
             * User community specific instrument.
             * Usage: This element is used to specify a local instrument, local clearing option and/or further qualify the service or service level.
             */
            LocalInstrument?: string;
            /**
             * Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party.
             * Usage: This amount has to be transported unchanged through the transaction chain.
             */
            InstructedAmount: {
              /**
               * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
               */
              Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
              /**
               * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
               */
              Currency: string; // ^[A-Z]{3,3}$
            };
            /**
             * Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction.
             */
            DebtorAccount?: {
              /**
               * Name of the identification scheme, in a coded form as published in an external list.
               */
              SchemeName: string;
              /**
               * Identification assigned by an institution to identify an account. This identification is known by the account owner.
               */
              Identification: string;
              /**
               * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
               * Note, the account name is not the product name or the nickname of the account.
               */
              Name?: string;
              /**
               * This is secondary identification of the account, as assigned by the account servicing institution.
               * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
               */
              SecondaryIdentification?: string;
            };
            /**
             * Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction.
             */
            CreditorAccount: {
              /**
               * Name of the identification scheme, in a coded form as published in an external list.
               */
              SchemeName: string;
              /**
               * Identification assigned by an institution to identify an account. This identification is known by the account owner.
               */
              Identification: string;
              /**
               * The account name is the name or names of the account owner(s) represented at an account level.
               * Note, the account name is not the product name or the nickname of the account.
               * OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory.
               */
              Name: string;
              /**
               * This is secondary identification of the account, as assigned by the account servicing institution.
               * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
               */
              SecondaryIdentification?: string;
            };
            /**
             * Information that locates and identifies a specific address, as defined by postal services.
             */
            CreditorPostalAddress?: {
              /**
               * Identifies the nature of the postal address.
               */
              AddressType?:
                | "Business"
                | "Correspondence"
                | "DeliveryTo"
                | "MailTo"
                | "POBox"
                | "Postal"
                | "Residential"
                | "Statement";
              /**
               * Identification of a division of a large organisation or building.
               */
              Department?: string;
              /**
               * Identification of a sub-division of a large organisation or building.
               */
              SubDepartment?: string;
              /**
               * Name of a street or thoroughfare.
               */
              StreetName?: string;
              /**
               * Number that identifies the position of a building on a street.
               */
              BuildingNumber?: string;
              /**
               * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
               */
              PostCode?: string;
              /**
               * Name of a built-up area, with defined boundaries, and a local government.
               */
              TownName?: string;
              /**
               * Identifies a subdivision of a country such as state, region, county.
               */
              CountrySubDivision?: string;
              /**
               * Nation with its own government.
               */
              Country?: string; // ^[A-Z]{2,2}$
              AddressLine?: string[];
            };
            /**
             * Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system.
             */
            RemittanceInformation?: {
              /**
               * Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form.
               */
              Unstructured?: string;
              /**
               * Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction.
               * Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money.
               * If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification.
               * OB: The Faster Payments Scheme can only accept 18 characters for the ReferenceInformation field - which is where this ISO field will be mapped.
               */
              Reference?: string;
            };
            /**
             * Additional information that can not be captured in the structured fields and/or any other specific block.
             */
            SupplementaryData?: unknown;
          };
          /**
           * The multiple authorisation flow response from the ASPSP.
           */
          MultiAuthorisation?: {
            /**
             * Specifies the status of the authorisation flow in code form.
             */
            Status: "Authorised" | "AwaitingFurtherAuthorisation" | "Rejected";
            /**
             * Number of authorisations required for payment order (total required at the start of the multi authorisation journey).
             */
            NumberRequired?: number;
            /**
             * Number of authorisations received.
             */
            NumberReceived?: number;
            /**
             * Last date and time at the authorisation flow was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            LastUpdateDateTime?: string; // date-time
            /**
             * Date and time at which the requested authorisation flow must be completed.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            ExpirationDateTime?: string; // date-time
          };
          /**
           * Set of elements used to identify a person or an organisation.
           */
          Debtor?: {
            /**
             * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account.
             */
            Name?: string;
          };
        };
      };
      /**
       * Tags associated with the resource
       */
      Tags?: string[];
    }
    export interface PaymentConsentInputResource {
      Data: {
        /**
         * Specifies to share the refund account details with PISP
         */
        ReadRefundAccount?: "No" | "Yes";
        /**
         * The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single domestic payment.
         */
        Initiation: {
          /**
           * Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction.
           * Usage: the  instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction.
           */
          InstructionIdentification: string;
          /**
           * Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain.
           * Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction.
           * OB: The Faster Payments Scheme can only access 31 characters for the EndToEndIdentification field.
           */
          EndToEndIdentification: string;
          /**
           * User community specific instrument.
           * Usage: This element is used to specify a local instrument, local clearing option and/or further qualify the service or service level.
           */
          LocalInstrument?: string;
          /**
           * Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party.
           * Usage: This amount has to be transported unchanged through the transaction chain.
           */
          InstructedAmount: {
            /**
             * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
             */
            Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
            /**
             * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
             */
            Currency: string; // ^[A-Z]{3,3}$
          };
          /**
           * Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction.
           */
          DebtorAccount?: {
            /**
             * Name of the identification scheme, in a coded form as published in an external list.
             */
            SchemeName: string;
            /**
             * Identification assigned by an institution to identify an account. This identification is known by the account owner.
             */
            Identification: string;
            /**
             * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
             * Note, the account name is not the product name or the nickname of the account.
             */
            Name?: string;
            /**
             * This is secondary identification of the account, as assigned by the account servicing institution.
             * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
             */
            SecondaryIdentification?: string;
          };
          /**
           * Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction.
           */
          CreditorAccount: {
            /**
             * Name of the identification scheme, in a coded form as published in an external list.
             */
            SchemeName: string;
            /**
             * Identification assigned by an institution to identify an account. This identification is known by the account owner.
             */
            Identification: string;
            /**
             * The account name is the name or names of the account owner(s) represented at an account level.
             * Note, the account name is not the product name or the nickname of the account.
             * OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory.
             */
            Name: string;
            /**
             * This is secondary identification of the account, as assigned by the account servicing institution.
             * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
             */
            SecondaryIdentification?: string;
          };
          /**
           * Information that locates and identifies a specific address, as defined by postal services.
           */
          CreditorPostalAddress?: {
            /**
             * Identifies the nature of the postal address.
             */
            AddressType?:
              | "Business"
              | "Correspondence"
              | "DeliveryTo"
              | "MailTo"
              | "POBox"
              | "Postal"
              | "Residential"
              | "Statement";
            /**
             * Identification of a division of a large organisation or building.
             */
            Department?: string;
            /**
             * Identification of a sub-division of a large organisation or building.
             */
            SubDepartment?: string;
            /**
             * Name of a street or thoroughfare.
             */
            StreetName?: string;
            /**
             * Number that identifies the position of a building on a street.
             */
            BuildingNumber?: string;
            /**
             * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
             */
            PostCode?: string;
            /**
             * Name of a built-up area, with defined boundaries, and a local government.
             */
            TownName?: string;
            /**
             * Identifies a subdivision of a country such as state, region, county.
             */
            CountrySubDivision?: string;
            /**
             * Nation with its own government.
             */
            Country?: string; // ^[A-Z]{2,2}$
            AddressLine?: string[];
          };
          /**
           * Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system.
           */
          RemittanceInformation?: {
            /**
             * Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form.
             */
            Unstructured?: string;
            /**
             * Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction.
             * Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money.
             * If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification.
             * OB: The Faster Payments Scheme can only accept 18 characters for the ReferenceInformation field - which is where this ISO field will be mapped.
             */
            Reference?: string;
          };
          /**
           * Additional information that can not be captured in the structured fields and/or any other specific block.
           */
          SupplementaryData?: unknown;
        };
        /**
         * The authorisation type request from the TPP.
         */
        Authorisation?: {
          /**
           * Type of authorisation flow requested.
           */
          AuthorisationType: "Any" | "Single";
          /**
           * Date and time at which the requested authorisation flow must be completed.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          CompletionDateTime?: string; // date-time
        };
        /**
         * Supporting Data provided by TPP, when requesting SCA Exemption.
         */
        SCASupportData?: {
          /**
           * This field allows a PISP to request specific SCA Exemption for a Payment Initiation
           */
          RequestedSCAExemptionType?:
            | "BillPayment"
            | "ContactlessTravel"
            | "EcommerceGoods"
            | "EcommerceServices"
            | "Kiosk"
            | "Parking"
            | "PartyToParty";
          /**
           * Specifies a character string with a maximum length of 40 characters.
           * Usage: This field indicates whether the PSU was subject to SCA performed by the TPP
           */
          AppliedAuthenticationApproach?: "CA" | "SCA";
          /**
           * Specifies a character string with a maximum length of 140 characters.
           * Usage: If the payment is recurring then the transaction identifier of the previous payment occurrence so that the ASPSP can verify that the PISP, amount and the payee are the same as the previous occurrence.
           */
          ReferencePaymentOrderId?: string;
        };
      };
      /**
       * The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments.
       */
      Risk: {
        /**
         * Specifies the payment context
         */
        PaymentContextCode?:
          | "BillPayment"
          | "EcommerceGoods"
          | "EcommerceServices"
          | "Other"
          | "PartyToParty";
        /**
         * Category code conform to ISO 18245, related to the type of services or goods the merchant provides for the transaction.
         */
        MerchantCategoryCode?: string;
        /**
         * The unique customer identifier of the PSU with the merchant.
         */
        MerchantCustomerIdentification?: string;
        /**
         * Information that locates and identifies a specific address, as defined by postal services or in free format text.
         */
        DeliveryAddress?: {
          AddressLine?: string[];
          /**
           * Name of a street or thoroughfare.
           */
          StreetName?: string;
          /**
           * Number that identifies the position of a building on a street.
           */
          BuildingNumber?: string;
          /**
           * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
           */
          PostCode?: string;
          /**
           * Name of a built-up area, with defined boundaries, and a local government.
           */
          TownName: string;
          /**
           * Identifies a subdivision of a country such as state, region, county.
           */
          CountrySubDivision?: string;
          /**
           * Nation with its own government, occupying a particular territory.
           */
          Country: string; // ^[A-Z]{2,2}$
        };
      };
    }
    export interface PaymentConsentResource {
      Data: {
        /**
         * OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource.
         */
        ConsentId: string;
        /**
         * Date and time at which the resource was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        CreationDateTime: string; // date-time
        /**
         * Specifies the status of consent resource in code form.
         */
        Status:
          | "Authorised"
          | "AwaitingAuthorisation"
          | "Consumed"
          | "Rejected";
        /**
         * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        StatusUpdateDateTime: string; // date-time
        /**
         * Specifies to share the refund account details with PISP
         */
        ReadRefundAccount?: "No" | "Yes";
        /**
         * Specified cut-off date and time for the payment consent.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        CutOffDateTime?: string; // date-time
        /**
         * Expected execution date and time for the payment resource.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        ExpectedExecutionDateTime?: string; // date-time
        /**
         * Expected settlement date and time for the payment resource.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        ExpectedSettlementDateTime?: string; // date-time
        Charges?: {
          /**
           * Specifies which party/parties will bear the charges associated with the processing of the payment transaction.
           */
          ChargeBearer:
            | "BorneByCreditor"
            | "BorneByDebtor"
            | "FollowingServiceLevel"
            | "Shared";
          /**
           * Charge type, in a coded form.
           */
          Type: string;
          /**
           * Amount of money associated with the charge type.
           */
          Amount: {
            /**
             * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
             */
            Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
            /**
             * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
             */
            Currency: string; // ^[A-Z]{3,3}$
          };
        }[];
        /**
         * The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single domestic payment.
         */
        Initiation: {
          /**
           * Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction.
           * Usage: the  instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction.
           */
          InstructionIdentification: string;
          /**
           * Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain.
           * Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction.
           * OB: The Faster Payments Scheme can only access 31 characters for the EndToEndIdentification field.
           */
          EndToEndIdentification: string;
          /**
           * User community specific instrument.
           * Usage: This element is used to specify a local instrument, local clearing option and/or further qualify the service or service level.
           */
          LocalInstrument?: string;
          /**
           * Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party.
           * Usage: This amount has to be transported unchanged through the transaction chain.
           */
          InstructedAmount: {
            /**
             * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
             */
            Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
            /**
             * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
             */
            Currency: string; // ^[A-Z]{3,3}$
          };
          /**
           * Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction.
           */
          DebtorAccount?: {
            /**
             * Name of the identification scheme, in a coded form as published in an external list.
             */
            SchemeName: string;
            /**
             * Identification assigned by an institution to identify an account. This identification is known by the account owner.
             */
            Identification: string;
            /**
             * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
             * Note, the account name is not the product name or the nickname of the account.
             */
            Name?: string;
            /**
             * This is secondary identification of the account, as assigned by the account servicing institution.
             * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
             */
            SecondaryIdentification?: string;
          };
          /**
           * Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction.
           */
          CreditorAccount: {
            /**
             * Name of the identification scheme, in a coded form as published in an external list.
             */
            SchemeName: string;
            /**
             * Identification assigned by an institution to identify an account. This identification is known by the account owner.
             */
            Identification: string;
            /**
             * The account name is the name or names of the account owner(s) represented at an account level.
             * Note, the account name is not the product name or the nickname of the account.
             * OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory.
             */
            Name: string;
            /**
             * This is secondary identification of the account, as assigned by the account servicing institution.
             * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
             */
            SecondaryIdentification?: string;
          };
          /**
           * Information that locates and identifies a specific address, as defined by postal services.
           */
          CreditorPostalAddress?: {
            /**
             * Identifies the nature of the postal address.
             */
            AddressType?:
              | "Business"
              | "Correspondence"
              | "DeliveryTo"
              | "MailTo"
              | "POBox"
              | "Postal"
              | "Residential"
              | "Statement";
            /**
             * Identification of a division of a large organisation or building.
             */
            Department?: string;
            /**
             * Identification of a sub-division of a large organisation or building.
             */
            SubDepartment?: string;
            /**
             * Name of a street or thoroughfare.
             */
            StreetName?: string;
            /**
             * Number that identifies the position of a building on a street.
             */
            BuildingNumber?: string;
            /**
             * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
             */
            PostCode?: string;
            /**
             * Name of a built-up area, with defined boundaries, and a local government.
             */
            TownName?: string;
            /**
             * Identifies a subdivision of a country such as state, region, county.
             */
            CountrySubDivision?: string;
            /**
             * Nation with its own government.
             */
            Country?: string; // ^[A-Z]{2,2}$
            AddressLine?: string[];
          };
          /**
           * Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system.
           */
          RemittanceInformation?: {
            /**
             * Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form.
             */
            Unstructured?: string;
            /**
             * Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction.
             * Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money.
             * If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification.
             * OB: The Faster Payments Scheme can only accept 18 characters for the ReferenceInformation field - which is where this ISO field will be mapped.
             */
            Reference?: string;
          };
          /**
           * Additional information that can not be captured in the structured fields and/or any other specific block.
           */
          SupplementaryData?: unknown;
        };
        /**
         * The authorisation type request from the TPP.
         */
        Authorisation?: {
          /**
           * Type of authorisation flow requested.
           */
          AuthorisationType: "Any" | "Single";
          /**
           * Date and time at which the requested authorisation flow must be completed.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          CompletionDateTime?: string; // date-time
        };
        /**
         * Supporting Data provided by TPP, when requesting SCA Exemption.
         */
        SCASupportData?: {
          /**
           * This field allows a PISP to request specific SCA Exemption for a Payment Initiation
           */
          RequestedSCAExemptionType?:
            | "BillPayment"
            | "ContactlessTravel"
            | "EcommerceGoods"
            | "EcommerceServices"
            | "Kiosk"
            | "Parking"
            | "PartyToParty";
          /**
           * Specifies a character string with a maximum length of 40 characters.
           * Usage: This field indicates whether the PSU was subject to SCA performed by the TPP
           */
          AppliedAuthenticationApproach?: "CA" | "SCA";
          /**
           * Specifies a character string with a maximum length of 140 characters.
           * Usage: If the payment is recurring then the transaction identifier of the previous payment occurrence so that the ASPSP can verify that the PISP, amount and the payee are the same as the previous occurrence.
           */
          ReferencePaymentOrderId?: string;
        };
        /**
         * Set of elements used to identify a person or an organisation.
         */
        Debtor?: {
          /**
           * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account.
           */
          Name?: string;
        };
      };
      /**
       * The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments.
       */
      Risk: {
        /**
         * Specifies the payment context
         */
        PaymentContextCode?:
          | "BillPayment"
          | "EcommerceGoods"
          | "EcommerceServices"
          | "Other"
          | "PartyToParty";
        /**
         * Category code conform to ISO 18245, related to the type of services or goods the merchant provides for the transaction.
         */
        MerchantCategoryCode?: string;
        /**
         * The unique customer identifier of the PSU with the merchant.
         */
        MerchantCustomerIdentification?: string;
        /**
         * Information that locates and identifies a specific address, as defined by postal services or in free format text.
         */
        DeliveryAddress?: {
          AddressLine?: string[];
          /**
           * Name of a street or thoroughfare.
           */
          StreetName?: string;
          /**
           * Number that identifies the position of a building on a street.
           */
          BuildingNumber?: string;
          /**
           * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
           */
          PostCode?: string;
          /**
           * Name of a built-up area, with defined boundaries, and a local government.
           */
          TownName: string;
          /**
           * Identifies a subdivision of a country such as state, region, county.
           */
          CountrySubDivision?: string;
          /**
           * Nation with its own government, occupying a particular territory.
           */
          Country: string; // ^[A-Z]{2,2}$
        };
      };
    }
    export interface PaymentFundsConfirmationInputResource {
      Data: {
        /**
         * Result of a funds availability check.
         */
        FundsAvailableResult?: {
          /**
           * Date and time at which the funds availability check was generated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          FundsAvailableDateTime: string; // date-time
          /**
           * Flag to indicate the availability of funds given the Amount in the consent request.
           */
          FundsAvailable: boolean;
        };
        /**
         * Additional information that can not be captured in the structured fields and/or any other specific block.
         */
        SupplementaryData?: unknown;
      };
    }
    export interface PaymentResource {
      Data: {
        /**
         * OB: Unique identification as assigned by the ASPSP to uniquely identify the domestic payment resource.
         */
        DomesticPaymentId: string;
        /**
         * OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource.
         */
        ConsentId: string;
        /**
         * Date and time at which the message was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        CreationDateTime: string; // date-time
        /**
         * Specifies the status of the payment information group.
         */
        Status:
          | "AcceptedCreditSettlementCompleted"
          | "AcceptedSettlementCompleted"
          | "AcceptedSettlementInProcess"
          | "AcceptedWithoutPosting"
          | "Pending"
          | "Rejected";
        /**
         * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        StatusUpdateDateTime: string; // date-time
        /**
         * Expected execution date and time for the payment resource.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        ExpectedExecutionDateTime?: string; // date-time
        /**
         * Expected settlement date and time for the payment resource.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        ExpectedSettlementDateTime?: string; // date-time
        /**
         * Unambiguous identification of the refund account to which a refund will be made as a result of the transaction.
         */
        Refund?: {
          /**
           * Provides the details to identify an account.
           */
          Account: {
            /**
             * Name of the identification scheme, in a coded form as published in an external list.
             */
            SchemeName: string;
            /**
             * Identification assigned by an institution to identify an account. This identification is known by the account owner.
             */
            Identification: string;
            /**
             * Name of the account, as assigned by the account servicing institution.
             * Usage: The account name is the name or names of the account owner(s) represented at an account level. The account name is not the product name or the nickname of the account.
             * OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory.
             */
            Name: string;
            /**
             * This is secondary identification of the account, as assigned by the account servicing institution.
             * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
             */
            SecondaryIdentification?: string;
          };
        };
        Charges?: {
          /**
           * Specifies which party/parties will bear the charges associated with the processing of the payment transaction.
           */
          ChargeBearer:
            | "BorneByCreditor"
            | "BorneByDebtor"
            | "FollowingServiceLevel"
            | "Shared";
          /**
           * Charge type, in a coded form.
           */
          Type: string;
          /**
           * Amount of money associated with the charge type.
           */
          Amount: {
            /**
             * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
             */
            Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
            /**
             * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
             */
            Currency: string; // ^[A-Z]{3,3}$
          };
        }[];
        /**
         * The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single domestic payment.
         */
        Initiation: {
          /**
           * Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction.
           * Usage: the  instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction.
           */
          InstructionIdentification: string;
          /**
           * Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain.
           * Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction.
           * OB: The Faster Payments Scheme can only access 31 characters for the EndToEndIdentification field.
           */
          EndToEndIdentification: string;
          /**
           * User community specific instrument.
           * Usage: This element is used to specify a local instrument, local clearing option and/or further qualify the service or service level.
           */
          LocalInstrument?: string;
          /**
           * Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party.
           * Usage: This amount has to be transported unchanged through the transaction chain.
           */
          InstructedAmount: {
            /**
             * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
             */
            Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
            /**
             * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
             */
            Currency: string; // ^[A-Z]{3,3}$
          };
          /**
           * Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction.
           */
          DebtorAccount?: {
            /**
             * Name of the identification scheme, in a coded form as published in an external list.
             */
            SchemeName: string;
            /**
             * Identification assigned by an institution to identify an account. This identification is known by the account owner.
             */
            Identification: string;
            /**
             * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
             * Note, the account name is not the product name or the nickname of the account.
             */
            Name?: string;
            /**
             * This is secondary identification of the account, as assigned by the account servicing institution.
             * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
             */
            SecondaryIdentification?: string;
          };
          /**
           * Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction.
           */
          CreditorAccount: {
            /**
             * Name of the identification scheme, in a coded form as published in an external list.
             */
            SchemeName: string;
            /**
             * Identification assigned by an institution to identify an account. This identification is known by the account owner.
             */
            Identification: string;
            /**
             * The account name is the name or names of the account owner(s) represented at an account level.
             * Note, the account name is not the product name or the nickname of the account.
             * OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory.
             */
            Name: string;
            /**
             * This is secondary identification of the account, as assigned by the account servicing institution.
             * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
             */
            SecondaryIdentification?: string;
          };
          /**
           * Information that locates and identifies a specific address, as defined by postal services.
           */
          CreditorPostalAddress?: {
            /**
             * Identifies the nature of the postal address.
             */
            AddressType?:
              | "Business"
              | "Correspondence"
              | "DeliveryTo"
              | "MailTo"
              | "POBox"
              | "Postal"
              | "Residential"
              | "Statement";
            /**
             * Identification of a division of a large organisation or building.
             */
            Department?: string;
            /**
             * Identification of a sub-division of a large organisation or building.
             */
            SubDepartment?: string;
            /**
             * Name of a street or thoroughfare.
             */
            StreetName?: string;
            /**
             * Number that identifies the position of a building on a street.
             */
            BuildingNumber?: string;
            /**
             * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
             */
            PostCode?: string;
            /**
             * Name of a built-up area, with defined boundaries, and a local government.
             */
            TownName?: string;
            /**
             * Identifies a subdivision of a country such as state, region, county.
             */
            CountrySubDivision?: string;
            /**
             * Nation with its own government.
             */
            Country?: string; // ^[A-Z]{2,2}$
            AddressLine?: string[];
          };
          /**
           * Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system.
           */
          RemittanceInformation?: {
            /**
             * Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form.
             */
            Unstructured?: string;
            /**
             * Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction.
             * Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money.
             * If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification.
             * OB: The Faster Payments Scheme can only accept 18 characters for the ReferenceInformation field - which is where this ISO field will be mapped.
             */
            Reference?: string;
          };
          /**
           * Additional information that can not be captured in the structured fields and/or any other specific block.
           */
          SupplementaryData?: unknown;
        };
        /**
         * The multiple authorisation flow response from the ASPSP.
         */
        MultiAuthorisation?: {
          /**
           * Specifies the status of the authorisation flow in code form.
           */
          Status: "Authorised" | "AwaitingFurtherAuthorisation" | "Rejected";
          /**
           * Number of authorisations required for payment order (total required at the start of the multi authorisation journey).
           */
          NumberRequired?: number;
          /**
           * Number of authorisations received.
           */
          NumberReceived?: number;
          /**
           * Last date and time at the authorisation flow was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          LastUpdateDateTime?: string; // date-time
          /**
           * Date and time at which the requested authorisation flow must be completed.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          ExpirationDateTime?: string; // date-time
        };
        /**
         * Set of elements used to identify a person or an organisation.
         */
        Debtor?: {
          /**
           * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account.
           */
          Name?: string;
        };
      };
    }
    /**
     * Unique reference, as assigned by the CBPII, to unambiguously refer to the request related to the payment transaction.
     */
    export type Reference = string;
    /**
     * Provides further details on an entry in the report.
     */
    export interface Resource {
      /**
       * A unique and immutable identifier used to identify the account resource. This identifier has no meaning to the account owner.
       */
      AccountId: string;
      /**
       * Unique identifier for the transaction within an servicing institution. This identifier is both unique and immutable.
       */
      TransactionId?: string;
      /**
       * Unique reference for the transaction. This reference is optionally populated, and may as an example be the FPID in the Faster Payments context.
       */
      TransactionReference?: string;
      StatementReference?: string[];
      /**
       * Indicates whether the transaction is a credit or a debit entry.
       */
      CreditDebitIndicator: "Credit" | "Debit";
      /**
       * Status of a transaction entry on the books of the account servicer.
       */
      Status: "Booked" | "Pending";
      /**
       * Specifies the Mutability of the Transaction record.
       */
      TransactionMutability?: "Mutable" | "Immutable";
      /**
       * Date and time when a transaction entry is posted to an account on the account servicer's books.
       * Usage: Booking date is the expected booking date, unless the status is booked, in which case it is the actual booking date.All dates in the JSON payloads are represented in ISO 8601 date-time format.
       * All date-time fields in responses must include the timezone. An example is below:
       * 2017-04-05T10:43:07+00:00
       */
      BookingDateTime: string; // date-time
      /**
       * Date and time at which assets become available to the account owner in case of a credit entry, or cease to be available to the account owner in case of a debit transaction entry.
       * Usage: If transaction entry status is pending and value date is present, then the value date refers to an expected/requested value date.
       * For transaction entries subject to availability/float and for which availability information is provided, the value date must not be used. In this case the availability component identifies the number of availability days.All dates in the JSON payloads are represented in ISO 8601 date-time format.
       * All date-time fields in responses must include the timezone. An example is below:
       * 2017-04-05T10:43:07+00:00
       */
      ValueDateTime?: string; // date-time
      /**
       * Further details of the transaction.
       * This is the transaction narrative, which is unstructured text.
       */
      TransactionInformation?: string;
      /**
       * Information that locates and identifies a specific address for a transaction entry, that is presented in free format text.
       */
      AddressLine?: string;
      /**
       * Amount of money in the cash transaction entry.
       */
      Amount: {
        /**
         * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
         */
        Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
        /**
         * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
         */
        Currency: string; // ^[A-Z]{3,3}$
      };
      /**
       * Transaction charges to be paid by the charge bearer.
       */
      ChargeAmount?: {
        /**
         * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
         */
        Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
        /**
         * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
         */
        Currency: string; // ^[A-Z]{3,3}$
      };
      /**
       * Set of elements used to provide details on the currency exchange.
       */
      CurrencyExchange?: {
        /**
         * Currency from which an amount is to be converted in a currency conversion.
         */
        SourceCurrency: string; // ^[A-Z]{3,3}$
        /**
         * Currency into which an amount is to be converted in a currency conversion.
         */
        TargetCurrency?: string; // ^[A-Z]{3,3}$
        /**
         * Currency in which the rate of exchange is expressed in a currency exchange. In the example 1GBP = xxxCUR, the unit currency is GBP.
         */
        UnitCurrency?: string; // ^[A-Z]{3,3}$
        /**
         * Factor used to convert an amount from one currency into another. This reflects the price at which one currency was bought with another currency.
         * Usage: ExchangeRate expresses the ratio between UnitCurrency and QuotedCurrency (ExchangeRate = UnitCurrency/QuotedCurrency).
         */
        ExchangeRate: number;
        /**
         * Unique identification to unambiguously identify the foreign exchange contract.
         */
        ContractIdentification?: string;
        /**
         * Date and time at which an exchange rate is quoted.All dates in the JSON payloads are represented in ISO 8601 date-time format.
         * All date-time fields in responses must include the timezone. An example is below:
         * 2017-04-05T10:43:07+00:00
         */
        QuotationDate?: string; // date-time
        /**
         * Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party.
         */
        InstructedAmount?: {
          /**
           * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
           */
          Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
          /**
           * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
           */
          Currency: string; // ^[A-Z]{3,3}$
        };
      };
      /**
       * Set of elements used to fully identify the type of underlying transaction resulting in an entry.
       */
      BankTransactionCode?: {
        /**
         * Specifies the family within a domain.
         */
        Code: string;
        /**
         * Specifies the sub-product family within a specific family.
         */
        SubCode: string;
      };
      /**
       * Set of elements to fully identify a proprietary bank transaction code.
       */
      ProprietaryBankTransactionCode?: {
        /**
         * Proprietary bank transaction code to identify the underlying transaction.
         */
        Code: string;
        /**
         * Identification of the issuer of the proprietary bank transaction code.
         */
        Issuer?: string;
      };
      /**
       * Set of elements used to define the balance as a numerical representation of the net increases and decreases in an account after a transaction entry is applied to the account.
       */
      Balance?: {
        /**
         * Indicates whether the balance is a credit or a debit balance.
         * Usage: A zero balance is considered to be a credit balance.
         */
        CreditDebitIndicator: "Credit" | "Debit";
        /**
         * Balance type, in a coded form.
         */
        Type:
          | "ClosingAvailable"
          | "ClosingBooked"
          | "ClosingCleared"
          | "Expected"
          | "ForwardAvailable"
          | "Information"
          | "InterimAvailable"
          | "InterimBooked"
          | "InterimCleared"
          | "OpeningAvailable"
          | "OpeningBooked"
          | "OpeningCleared"
          | "PreviouslyClosedBooked";
        /**
         * Amount of money of the cash balance after a transaction entry is applied to the account..
         */
        Amount: {
          /**
           * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
           */
          Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
          /**
           * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
           */
          Currency: string; // ^[A-Z]{3,3}$
        };
      };
      /**
       * Details of the merchant involved in the transaction.
       */
      MerchantDetails?: {
        /**
         * Name by which the merchant is known.
         */
        MerchantName?: string;
        /**
         * Category code conform to ISO 18245, related to the type of services or goods the merchant provides for the transaction.
         */
        MerchantCategoryCode?: string;
      };
      /**
       * Financial institution servicing an account for the creditor.
       */
      CreditorAgent?: {
        /**
         * Name of the identification scheme, in a coded form as published in an external list.
         */
        SchemeName?: string;
        /**
         * Unique and unambiguous identification of a financial institution or a branch of a financial institution.
         */
        Identification?: string;
        /**
         * Name by which an agent is known and which is usually used to identify that agent.
         */
        Name?: string;
        /**
         * Information that locates and identifies a specific address, as defined by postal services.
         */
        PostalAddress?: {
          /**
           * Identifies the nature of the postal address.
           */
          AddressType?:
            | "Business"
            | "Correspondence"
            | "DeliveryTo"
            | "MailTo"
            | "POBox"
            | "Postal"
            | "Residential"
            | "Statement";
          /**
           * Identification of a division of a large organisation or building.
           */
          Department?: string;
          /**
           * Identification of a sub-division of a large organisation or building.
           */
          SubDepartment?: string;
          /**
           * Name of a street or thoroughfare.
           */
          StreetName?: string;
          /**
           * Number that identifies the position of a building on a street.
           */
          BuildingNumber?: string;
          /**
           * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
           */
          PostCode?: string;
          /**
           * Name of a built-up area, with defined boundaries, and a local government.
           */
          TownName?: string;
          /**
           * Identifies a subdivision of a country such as state, region, county.
           */
          CountrySubDivision?: string;
          /**
           * Nation with its own government.
           */
          Country?: string; // ^[A-Z]{2,2}$
          AddressLine?: string[];
        };
      };
      /**
       * Unambiguous identification of the account of the creditor, in the case of a debit transaction.
       */
      CreditorAccount?: {
        /**
         * Name of the identification scheme, in a coded form as published in an external list.
         */
        SchemeName?: string;
        /**
         * Identification assigned by an institution to identify an account. This identification is known by the account owner.
         */
        Identification?: string;
        /**
         * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
         * Note, the account name is not the product name or the nickname of the account.
         */
        Name?: string;
        /**
         * This is secondary identification of the account, as assigned by the account servicing institution.
         * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
         */
        SecondaryIdentification?: string;
      };
      /**
       * Financial institution servicing an account for the debtor.
       */
      DebtorAgent?: {
        /**
         * Name of the identification scheme, in a coded form as published in an external list.
         */
        SchemeName?: string;
        /**
         * Unique and unambiguous identification of a financial institution or a branch of a financial institution.
         */
        Identification?: string;
        /**
         * Name by which an agent is known and which is usually used to identify that agent.
         */
        Name?: string;
        /**
         * Information that locates and identifies a specific address, as defined by postal services.
         */
        PostalAddress?: {
          /**
           * Identifies the nature of the postal address.
           */
          AddressType?:
            | "Business"
            | "Correspondence"
            | "DeliveryTo"
            | "MailTo"
            | "POBox"
            | "Postal"
            | "Residential"
            | "Statement";
          /**
           * Identification of a division of a large organisation or building.
           */
          Department?: string;
          /**
           * Identification of a sub-division of a large organisation or building.
           */
          SubDepartment?: string;
          /**
           * Name of a street or thoroughfare.
           */
          StreetName?: string;
          /**
           * Number that identifies the position of a building on a street.
           */
          BuildingNumber?: string;
          /**
           * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
           */
          PostCode?: string;
          /**
           * Name of a built-up area, with defined boundaries, and a local government.
           */
          TownName?: string;
          /**
           * Identifies a subdivision of a country such as state, region, county.
           */
          CountrySubDivision?: string;
          /**
           * Nation with its own government.
           */
          Country?: string; // ^[A-Z]{2,2}$
          AddressLine?: string[];
        };
      };
      /**
       * Unambiguous identification of the account of the debtor, in the case of a crebit transaction.
       */
      DebtorAccount?: {
        /**
         * Name of the identification scheme, in a coded form as published in an external list.
         */
        SchemeName?: string;
        /**
         * Identification assigned by an institution to identify an account. This identification is known by the account owner.
         */
        Identification?: string;
        /**
         * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
         * Note, the account name is not the product name or the nickname of the account.
         */
        Name?: string;
        /**
         * This is secondary identification of the account, as assigned by the account servicing institution.
         * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
         */
        SecondaryIdentification?: string;
      };
      /**
       * Set of elements to describe the card instrument used in the transaction.
       */
      CardInstrument?: {
        /**
         * Name of the card scheme.
         */
        CardSchemeName:
          | "AmericanExpress"
          | "Diners"
          | "Discover"
          | "MasterCard"
          | "VISA";
        /**
         * The card authorisation type.
         */
        AuthorisationType?: "ConsumerDevice" | "Contactless" | "None" | "PIN";
        /**
         * Name of the cardholder using the card instrument.
         */
        Name?: string;
        /**
         * Identification assigned by an institution to identify the card instrument used in the transaction. This identification is known by the account owner, and may be masked.
         */
        Identification?: string;
      };
      /**
       * Additional information that can not be captured in the structured fields and/or any other specific block.
       */
      SupplementaryData?: unknown;
    }
    /**
     * The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Account Info.
     */
    export interface Risk {}
    export type SupportedModules = ("ais" | "pis" | "cbpii" | "cop")[];
    /**
     * Tags associated with the resource
     */
    export type Tags = string[];
    export interface UpdateJobScheduleRequest {
      Description?: string;
      /**
       * **Cron** expression that determines when the job should run. The supported format is described [here](https://github.com/harrisiirak/cron-parser)
       */
      ScheduleExpression?: string;
      /**
       * Status of the job schedule. Only active jobs will trigger job executions.
       */
      Status?: "Active" | "Inactive";
    }
    export interface VerificationReport {
      /**
       * Whether the name was matched
       */
      Matched: boolean;
      /**
       * Code of the reason why the match was **not** successful
       */
      ReasonCode?:
        | "ANNM"
        | "MBAM"
        | "BANM"
        | "PANM"
        | "BAMM"
        | "PAMM"
        | "AC01"
        | "IVCR"
        | "ACNS"
        | "OPTO"
        | "CASS"
        | "SCNS";
      /**
       * Name of possible match, if applicable according to `ReasonCode`
       */
      Name?: string;
    }
  }
}
declare namespace Paths {
  namespace CompleteAccountAccessAuth {
    namespace Parameters {
      export type ConsentId = string;
    }
    export interface PathParameters {
      ConsentId: Parameters.ConsentId;
    }
    export interface RequestBody {
      code: string;
    }
    namespace Responses {
      export interface $200 {}
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "completeAccountAccessAuth";
      method: "put";
      expressPath: "/account-access-consents/:ConsentId/auth";
      openapiPath: "/account-access-consents/{ConsentId}/auth";
      pathParams: Paths.CompleteAccountAccessAuth.PathParameters;
      responses:
        | Paths.CompleteAccountAccessAuth.Responses.$200
        | Paths.CompleteAccountAccessAuth.Responses.$400
        | Paths.CompleteAccountAccessAuth.Responses.$500;
      successResponses: Paths.CompleteAccountAccessAuth.Responses.$200;
      requestBody: Paths.CompleteAccountAccessAuth.RequestBody;
      queryParams?: unknown;
      headers?: unknown;
    }
    type Route = RequestHandler<
      Paths.CompleteAccountAccessAuth.PathParameters,
      | Paths.CompleteAccountAccessAuth.Responses.$200
      | Paths.CompleteAccountAccessAuth.Responses.$400
      | Paths.CompleteAccountAccessAuth.Responses.$500,
      Paths.CompleteAccountAccessAuth.RequestBody,
      unknown
    >;
  }
  namespace CompleteDomesticPaymentAuth {
    namespace Parameters {
      export type ConsentId = string;
    }
    export interface PathParameters {
      ConsentId: Parameters.ConsentId;
    }
    export interface RequestBody {
      code: string;
    }
    namespace Responses {
      export interface $200 {}
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "completeDomesticPaymentAuth";
      method: "put";
      expressPath: "/domestic-payment-consents/:ConsentId/auth";
      openapiPath: "/domestic-payment-consents/{ConsentId}/auth";
      pathParams: Paths.CompleteDomesticPaymentAuth.PathParameters;
      responses:
        | Paths.CompleteDomesticPaymentAuth.Responses.$200
        | Paths.CompleteDomesticPaymentAuth.Responses.$400
        | Paths.CompleteDomesticPaymentAuth.Responses.$500;
      successResponses: Paths.CompleteDomesticPaymentAuth.Responses.$200;
      requestBody: Paths.CompleteDomesticPaymentAuth.RequestBody;
      queryParams?: unknown;
      headers?: unknown;
    }
    type Route = RequestHandler<
      Paths.CompleteDomesticPaymentAuth.PathParameters,
      | Paths.CompleteDomesticPaymentAuth.Responses.$200
      | Paths.CompleteDomesticPaymentAuth.Responses.$400
      | Paths.CompleteDomesticPaymentAuth.Responses.$500,
      Paths.CompleteDomesticPaymentAuth.RequestBody,
      unknown
    >;
  }
  namespace CompleteFundsConfirmationAuth {
    namespace Parameters {
      export type ConsentId = string;
    }
    export interface PathParameters {
      ConsentId: Parameters.ConsentId;
    }
    export interface RequestBody {
      code: string;
    }
    namespace Responses {
      export interface $200 {}
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "completeFundsConfirmationAuth";
      method: "put";
      expressPath: "/funds-confirmation-consents/:ConsentId/auth";
      openapiPath: "/funds-confirmation-consents/{ConsentId}/auth";
      pathParams: Paths.CompleteFundsConfirmationAuth.PathParameters;
      responses:
        | Paths.CompleteFundsConfirmationAuth.Responses.$200
        | Paths.CompleteFundsConfirmationAuth.Responses.$400
        | Paths.CompleteFundsConfirmationAuth.Responses.$500;
      successResponses: Paths.CompleteFundsConfirmationAuth.Responses.$200;
      requestBody: Paths.CompleteFundsConfirmationAuth.RequestBody;
      queryParams?: unknown;
      headers?: unknown;
    }
    type Route = RequestHandler<
      Paths.CompleteFundsConfirmationAuth.PathParameters,
      | Paths.CompleteFundsConfirmationAuth.Responses.$200
      | Paths.CompleteFundsConfirmationAuth.Responses.$400
      | Paths.CompleteFundsConfirmationAuth.Responses.$500,
      Paths.CompleteFundsConfirmationAuth.RequestBody,
      unknown
    >;
  }
  namespace ConfirmationOfPayee {
    namespace Parameters {
      export type PartnershipId = string;
    }
    export interface QueryParameters {
      PartnershipId: Parameters.PartnershipId;
    }
    export interface RequestBody {
      Resource: {
        Data: {
          SchemeName: "SortCodeAccountNumber";
          AccountType: "Personal" | "Business";
          Name: string;
          Identification: string;
        };
      };
    }
    namespace Responses {
      export interface $200 {
        Resource: {
          Data: {
            VerificationReport: {
              /**
               * Whether the name was matched
               */
              Matched: boolean;
              /**
               * Code of the reason why the match was **not** successful
               */
              ReasonCode?:
                | "ANNM"
                | "MBAM"
                | "BANM"
                | "PANM"
                | "BAMM"
                | "PAMM"
                | "AC01"
                | "IVCR"
                | "ACNS"
                | "OPTO"
                | "CASS"
                | "SCNS";
              /**
               * Name of possible match, if applicable according to `ReasonCode`
               */
              Name?: string;
            };
          };
        };
      }
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "confirmationOfPayee";
      method: "post";
      expressPath: "/accounts/name-verification";
      openapiPath: "/accounts/name-verification";
      pathParams?: unknown;
      responses:
        | Paths.ConfirmationOfPayee.Responses.$200
        | Paths.ConfirmationOfPayee.Responses.$400
        | Paths.ConfirmationOfPayee.Responses.$500;
      successResponses: Paths.ConfirmationOfPayee.Responses.$200;
      requestBody: Paths.ConfirmationOfPayee.RequestBody;
      queryParams: Paths.ConfirmationOfPayee.QueryParameters;
      headers?: unknown;
    }
    type Route = RequestHandler<
      unknown,
      | Paths.ConfirmationOfPayee.Responses.$200
      | Paths.ConfirmationOfPayee.Responses.$400
      | Paths.ConfirmationOfPayee.Responses.$500,
      Paths.ConfirmationOfPayee.RequestBody,
      Paths.ConfirmationOfPayee.QueryParameters
    >;
  }
  namespace CreateAccountAccessConsent {
    namespace Parameters {
      export type PartnershipId = string;
    }
    export interface QueryParameters {
      PartnershipId?: Parameters.PartnershipId;
    }
    export interface RequestBody {
      Resource: {
        Data: {
          Permissions: (
            | "ReadAccountsBasic"
            | "ReadAccountsDetail"
            | "ReadBalances"
            | "ReadBeneficiariesBasic"
            | "ReadBeneficiariesDetail"
            | "ReadDirectDebits"
            | "ReadOffers"
            | "ReadPAN"
            | "ReadParty"
            | "ReadPartyPSU"
            | "ReadProducts"
            | "ReadScheduledPaymentsBasic"
            | "ReadScheduledPaymentsDetail"
            | "ReadStandingOrdersBasic"
            | "ReadStandingOrdersDetail"
            | "ReadStatementsBasic"
            | "ReadStatementsDetail"
            | "ReadTransactionsBasic"
            | "ReadTransactionsCredits"
            | "ReadTransactionsDebits"
            | "ReadTransactionsDetail"
          )[];
          /**
           * Specified date and time the permissions will expire.
           * If this is not populated, the permissions will be open ended.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          ExpirationDateTime?: string; // date-time
          /**
           * Specified start date and time for the transaction query period.
           * If this is not populated, the start date will be open ended, and data will be returned from the earliest available transaction.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          TransactionFromDateTime?: string; // date-time
          /**
           * Specified end date and time for the transaction query period.
           * If this is not populated, the end date will be open ended, and data will be returned to the latest available transaction.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          TransactionToDateTime?: string; // date-time
        };
        /**
         * The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Account Info.
         */
        Risk: unknown;
      };
      /**
       * Tags to associate with the resource
       */
      Tags?: string[];
    }
    namespace Responses {
      export interface $201 {
        ConsentId: string;
        ConsentType: "AccountAccess";
        Partnership?: {
          PartnershipId: string;
          CustomerFriendlyName: string;
          CustomerFriendlyLogoUri?: string;
        };
        Resource: {
          Data: {
            /**
             * Unique identification as assigned to identify the account access consent resource.
             */
            ConsentId: string;
            /**
             * Date and time at which the resource was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            CreationDateTime: string; // date-time
            /**
             * Specifies the status of consent resource in code form.
             */
            Status:
              | "Authorised"
              | "AwaitingAuthorisation"
              | "Rejected"
              | "Revoked";
            /**
             * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            StatusUpdateDateTime: string; // date-time
            Permissions: (
              | "ReadAccountsBasic"
              | "ReadAccountsDetail"
              | "ReadBalances"
              | "ReadBeneficiariesBasic"
              | "ReadBeneficiariesDetail"
              | "ReadDirectDebits"
              | "ReadOffers"
              | "ReadPAN"
              | "ReadParty"
              | "ReadPartyPSU"
              | "ReadProducts"
              | "ReadScheduledPaymentsBasic"
              | "ReadScheduledPaymentsDetail"
              | "ReadStandingOrdersBasic"
              | "ReadStandingOrdersDetail"
              | "ReadStatementsBasic"
              | "ReadStatementsDetail"
              | "ReadTransactionsBasic"
              | "ReadTransactionsCredits"
              | "ReadTransactionsDebits"
              | "ReadTransactionsDetail"
            )[];
            /**
             * Specified date and time the permissions will expire.
             * If this is not populated, the permissions will be open ended.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            ExpirationDateTime?: string; // date-time
            /**
             * Specified start date and time for the transaction query period.
             * If this is not populated, the start date will be open ended, and data will be returned from the earliest available transaction.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            TransactionFromDateTime?: string; // date-time
            /**
             * Specified end date and time for the transaction query period.
             * If this is not populated, the end date will be open ended, and data will be returned to the latest available transaction.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            TransactionToDateTime?: string; // date-time
          };
          /**
           * The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Account Info.
           */
          Risk: unknown;
        };
        /**
         * Tags associated with the resource
         */
        Tags?: string[];
      }
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "createAccountAccessConsent";
      method: "post";
      expressPath: "/account-access-consents";
      openapiPath: "/account-access-consents";
      pathParams?: unknown;
      responses:
        | Paths.CreateAccountAccessConsent.Responses.$201
        | Paths.CreateAccountAccessConsent.Responses.$400
        | Paths.CreateAccountAccessConsent.Responses.$500;
      successResponses: Paths.CreateAccountAccessConsent.Responses.$201;
      requestBody: Paths.CreateAccountAccessConsent.RequestBody;
      queryParams: Paths.CreateAccountAccessConsent.QueryParameters;
      headers?: unknown;
    }
    type Route = RequestHandler<
      unknown,
      | Paths.CreateAccountAccessConsent.Responses.$201
      | Paths.CreateAccountAccessConsent.Responses.$400
      | Paths.CreateAccountAccessConsent.Responses.$500,
      Paths.CreateAccountAccessConsent.RequestBody,
      Paths.CreateAccountAccessConsent.QueryParameters
    >;
  }
  namespace CreateDomesticPayment {
    namespace Parameters {
      export type ConsentId = string;
    }
    export interface QueryParameters {
      ConsentId: Parameters.ConsentId;
    }
    namespace Responses {
      export interface $200 {
        PaymentId: string;
        PaymentType: "DomesticPayment";
        Resource: {
          Data: {
            /**
             * OB: Unique identification as assigned by the ASPSP to uniquely identify the domestic payment resource.
             */
            DomesticPaymentId: string;
            /**
             * OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource.
             */
            ConsentId: string;
            /**
             * Date and time at which the message was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            CreationDateTime: string; // date-time
            /**
             * Specifies the status of the payment information group.
             */
            Status:
              | "AcceptedCreditSettlementCompleted"
              | "AcceptedSettlementCompleted"
              | "AcceptedSettlementInProcess"
              | "AcceptedWithoutPosting"
              | "Pending"
              | "Rejected";
            /**
             * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            StatusUpdateDateTime: string; // date-time
            /**
             * Expected execution date and time for the payment resource.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            ExpectedExecutionDateTime?: string; // date-time
            /**
             * Expected settlement date and time for the payment resource.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            ExpectedSettlementDateTime?: string; // date-time
            /**
             * Unambiguous identification of the refund account to which a refund will be made as a result of the transaction.
             */
            Refund?: {
              /**
               * Provides the details to identify an account.
               */
              Account: {
                /**
                 * Name of the identification scheme, in a coded form as published in an external list.
                 */
                SchemeName: string;
                /**
                 * Identification assigned by an institution to identify an account. This identification is known by the account owner.
                 */
                Identification: string;
                /**
                 * Name of the account, as assigned by the account servicing institution.
                 * Usage: The account name is the name or names of the account owner(s) represented at an account level. The account name is not the product name or the nickname of the account.
                 * OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory.
                 */
                Name: string;
                /**
                 * This is secondary identification of the account, as assigned by the account servicing institution.
                 * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
                 */
                SecondaryIdentification?: string;
              };
            };
            Charges?: {
              /**
               * Specifies which party/parties will bear the charges associated with the processing of the payment transaction.
               */
              ChargeBearer:
                | "BorneByCreditor"
                | "BorneByDebtor"
                | "FollowingServiceLevel"
                | "Shared";
              /**
               * Charge type, in a coded form.
               */
              Type: string;
              /**
               * Amount of money associated with the charge type.
               */
              Amount: {
                /**
                 * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
                 */
                Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
                /**
                 * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
                 */
                Currency: string; // ^[A-Z]{3,3}$
              };
            }[];
            /**
             * The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single domestic payment.
             */
            Initiation: {
              /**
               * Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction.
               * Usage: the  instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction.
               */
              InstructionIdentification: string;
              /**
               * Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain.
               * Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction.
               * OB: The Faster Payments Scheme can only access 31 characters for the EndToEndIdentification field.
               */
              EndToEndIdentification: string;
              /**
               * User community specific instrument.
               * Usage: This element is used to specify a local instrument, local clearing option and/or further qualify the service or service level.
               */
              LocalInstrument?: string;
              /**
               * Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party.
               * Usage: This amount has to be transported unchanged through the transaction chain.
               */
              InstructedAmount: {
                /**
                 * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
                 */
                Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
                /**
                 * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
                 */
                Currency: string; // ^[A-Z]{3,3}$
              };
              /**
               * Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction.
               */
              DebtorAccount?: {
                /**
                 * Name of the identification scheme, in a coded form as published in an external list.
                 */
                SchemeName: string;
                /**
                 * Identification assigned by an institution to identify an account. This identification is known by the account owner.
                 */
                Identification: string;
                /**
                 * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
                 * Note, the account name is not the product name or the nickname of the account.
                 */
                Name?: string;
                /**
                 * This is secondary identification of the account, as assigned by the account servicing institution.
                 * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
                 */
                SecondaryIdentification?: string;
              };
              /**
               * Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction.
               */
              CreditorAccount: {
                /**
                 * Name of the identification scheme, in a coded form as published in an external list.
                 */
                SchemeName: string;
                /**
                 * Identification assigned by an institution to identify an account. This identification is known by the account owner.
                 */
                Identification: string;
                /**
                 * The account name is the name or names of the account owner(s) represented at an account level.
                 * Note, the account name is not the product name or the nickname of the account.
                 * OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory.
                 */
                Name: string;
                /**
                 * This is secondary identification of the account, as assigned by the account servicing institution.
                 * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
                 */
                SecondaryIdentification?: string;
              };
              /**
               * Information that locates and identifies a specific address, as defined by postal services.
               */
              CreditorPostalAddress?: {
                /**
                 * Identifies the nature of the postal address.
                 */
                AddressType?:
                  | "Business"
                  | "Correspondence"
                  | "DeliveryTo"
                  | "MailTo"
                  | "POBox"
                  | "Postal"
                  | "Residential"
                  | "Statement";
                /**
                 * Identification of a division of a large organisation or building.
                 */
                Department?: string;
                /**
                 * Identification of a sub-division of a large organisation or building.
                 */
                SubDepartment?: string;
                /**
                 * Name of a street or thoroughfare.
                 */
                StreetName?: string;
                /**
                 * Number that identifies the position of a building on a street.
                 */
                BuildingNumber?: string;
                /**
                 * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
                 */
                PostCode?: string;
                /**
                 * Name of a built-up area, with defined boundaries, and a local government.
                 */
                TownName?: string;
                /**
                 * Identifies a subdivision of a country such as state, region, county.
                 */
                CountrySubDivision?: string;
                /**
                 * Nation with its own government.
                 */
                Country?: string; // ^[A-Z]{2,2}$
                AddressLine?: string[];
              };
              /**
               * Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system.
               */
              RemittanceInformation?: {
                /**
                 * Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form.
                 */
                Unstructured?: string;
                /**
                 * Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction.
                 * Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money.
                 * If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification.
                 * OB: The Faster Payments Scheme can only accept 18 characters for the ReferenceInformation field - which is where this ISO field will be mapped.
                 */
                Reference?: string;
              };
              /**
               * Additional information that can not be captured in the structured fields and/or any other specific block.
               */
              SupplementaryData?: unknown;
            };
            /**
             * The multiple authorisation flow response from the ASPSP.
             */
            MultiAuthorisation?: {
              /**
               * Specifies the status of the authorisation flow in code form.
               */
              Status:
                | "Authorised"
                | "AwaitingFurtherAuthorisation"
                | "Rejected";
              /**
               * Number of authorisations required for payment order (total required at the start of the multi authorisation journey).
               */
              NumberRequired?: number;
              /**
               * Number of authorisations received.
               */
              NumberReceived?: number;
              /**
               * Last date and time at the authorisation flow was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
               * All date-time fields in responses must include the timezone. An example is below:
               * 2017-04-05T10:43:07+00:00
               */
              LastUpdateDateTime?: string; // date-time
              /**
               * Date and time at which the requested authorisation flow must be completed.All dates in the JSON payloads are represented in ISO 8601 date-time format.
               * All date-time fields in responses must include the timezone. An example is below:
               * 2017-04-05T10:43:07+00:00
               */
              ExpirationDateTime?: string; // date-time
            };
            /**
             * Set of elements used to identify a person or an organisation.
             */
            Debtor?: {
              /**
               * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account.
               */
              Name?: string;
            };
          };
        };
        /**
         * Tags associated with the resource
         */
        Tags?: string[];
      }
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "createDomesticPayment";
      method: "post";
      expressPath: "/domestic-payments";
      openapiPath: "/domestic-payments";
      pathParams?: unknown;
      responses:
        | Paths.CreateDomesticPayment.Responses.$200
        | Paths.CreateDomesticPayment.Responses.$400
        | Paths.CreateDomesticPayment.Responses.$500;
      successResponses: Paths.CreateDomesticPayment.Responses.$200;
      requestBody?: unknown;
      queryParams: Paths.CreateDomesticPayment.QueryParameters;
      headers?: unknown;
    }
    type Route = RequestHandler<
      unknown,
      | Paths.CreateDomesticPayment.Responses.$200
      | Paths.CreateDomesticPayment.Responses.$400
      | Paths.CreateDomesticPayment.Responses.$500,
      unknown,
      Paths.CreateDomesticPayment.QueryParameters
    >;
  }
  namespace CreateDomesticPaymentConsent {
    namespace Parameters {
      export type PartnershipId = string;
    }
    export interface QueryParameters {
      PartnershipId?: Parameters.PartnershipId;
    }
    export interface RequestBody {
      Resource: {
        Data: {
          /**
           * Specifies to share the refund account details with PISP
           */
          ReadRefundAccount?: "No" | "Yes";
          /**
           * The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single domestic payment.
           */
          Initiation: {
            /**
             * Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction.
             * Usage: the  instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction.
             */
            InstructionIdentification: string;
            /**
             * Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain.
             * Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction.
             * OB: The Faster Payments Scheme can only access 31 characters for the EndToEndIdentification field.
             */
            EndToEndIdentification: string;
            /**
             * User community specific instrument.
             * Usage: This element is used to specify a local instrument, local clearing option and/or further qualify the service or service level.
             */
            LocalInstrument?: string;
            /**
             * Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party.
             * Usage: This amount has to be transported unchanged through the transaction chain.
             */
            InstructedAmount: {
              /**
               * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
               */
              Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
              /**
               * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
               */
              Currency: string; // ^[A-Z]{3,3}$
            };
            /**
             * Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction.
             */
            DebtorAccount?: {
              /**
               * Name of the identification scheme, in a coded form as published in an external list.
               */
              SchemeName: string;
              /**
               * Identification assigned by an institution to identify an account. This identification is known by the account owner.
               */
              Identification: string;
              /**
               * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
               * Note, the account name is not the product name or the nickname of the account.
               */
              Name?: string;
              /**
               * This is secondary identification of the account, as assigned by the account servicing institution.
               * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
               */
              SecondaryIdentification?: string;
            };
            /**
             * Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction.
             */
            CreditorAccount: {
              /**
               * Name of the identification scheme, in a coded form as published in an external list.
               */
              SchemeName: string;
              /**
               * Identification assigned by an institution to identify an account. This identification is known by the account owner.
               */
              Identification: string;
              /**
               * The account name is the name or names of the account owner(s) represented at an account level.
               * Note, the account name is not the product name or the nickname of the account.
               * OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory.
               */
              Name: string;
              /**
               * This is secondary identification of the account, as assigned by the account servicing institution.
               * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
               */
              SecondaryIdentification?: string;
            };
            /**
             * Information that locates and identifies a specific address, as defined by postal services.
             */
            CreditorPostalAddress?: {
              /**
               * Identifies the nature of the postal address.
               */
              AddressType?:
                | "Business"
                | "Correspondence"
                | "DeliveryTo"
                | "MailTo"
                | "POBox"
                | "Postal"
                | "Residential"
                | "Statement";
              /**
               * Identification of a division of a large organisation or building.
               */
              Department?: string;
              /**
               * Identification of a sub-division of a large organisation or building.
               */
              SubDepartment?: string;
              /**
               * Name of a street or thoroughfare.
               */
              StreetName?: string;
              /**
               * Number that identifies the position of a building on a street.
               */
              BuildingNumber?: string;
              /**
               * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
               */
              PostCode?: string;
              /**
               * Name of a built-up area, with defined boundaries, and a local government.
               */
              TownName?: string;
              /**
               * Identifies a subdivision of a country such as state, region, county.
               */
              CountrySubDivision?: string;
              /**
               * Nation with its own government.
               */
              Country?: string; // ^[A-Z]{2,2}$
              AddressLine?: string[];
            };
            /**
             * Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system.
             */
            RemittanceInformation?: {
              /**
               * Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form.
               */
              Unstructured?: string;
              /**
               * Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction.
               * Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money.
               * If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification.
               * OB: The Faster Payments Scheme can only accept 18 characters for the ReferenceInformation field - which is where this ISO field will be mapped.
               */
              Reference?: string;
            };
            /**
             * Additional information that can not be captured in the structured fields and/or any other specific block.
             */
            SupplementaryData?: unknown;
          };
          /**
           * The authorisation type request from the TPP.
           */
          Authorisation?: {
            /**
             * Type of authorisation flow requested.
             */
            AuthorisationType: "Any" | "Single";
            /**
             * Date and time at which the requested authorisation flow must be completed.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            CompletionDateTime?: string; // date-time
          };
          /**
           * Supporting Data provided by TPP, when requesting SCA Exemption.
           */
          SCASupportData?: {
            /**
             * This field allows a PISP to request specific SCA Exemption for a Payment Initiation
             */
            RequestedSCAExemptionType?:
              | "BillPayment"
              | "ContactlessTravel"
              | "EcommerceGoods"
              | "EcommerceServices"
              | "Kiosk"
              | "Parking"
              | "PartyToParty";
            /**
             * Specifies a character string with a maximum length of 40 characters.
             * Usage: This field indicates whether the PSU was subject to SCA performed by the TPP
             */
            AppliedAuthenticationApproach?: "CA" | "SCA";
            /**
             * Specifies a character string with a maximum length of 140 characters.
             * Usage: If the payment is recurring then the transaction identifier of the previous payment occurrence so that the ASPSP can verify that the PISP, amount and the payee are the same as the previous occurrence.
             */
            ReferencePaymentOrderId?: string;
          };
        };
        /**
         * The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments.
         */
        Risk: {
          /**
           * Specifies the payment context
           */
          PaymentContextCode?:
            | "BillPayment"
            | "EcommerceGoods"
            | "EcommerceServices"
            | "Other"
            | "PartyToParty";
          /**
           * Category code conform to ISO 18245, related to the type of services or goods the merchant provides for the transaction.
           */
          MerchantCategoryCode?: string;
          /**
           * The unique customer identifier of the PSU with the merchant.
           */
          MerchantCustomerIdentification?: string;
          /**
           * Information that locates and identifies a specific address, as defined by postal services or in free format text.
           */
          DeliveryAddress?: {
            AddressLine?: string[];
            /**
             * Name of a street or thoroughfare.
             */
            StreetName?: string;
            /**
             * Number that identifies the position of a building on a street.
             */
            BuildingNumber?: string;
            /**
             * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
             */
            PostCode?: string;
            /**
             * Name of a built-up area, with defined boundaries, and a local government.
             */
            TownName: string;
            /**
             * Identifies a subdivision of a country such as state, region, county.
             */
            CountrySubDivision?: string;
            /**
             * Nation with its own government, occupying a particular territory.
             */
            Country: string; // ^[A-Z]{2,2}$
          };
        };
      };
      /**
       * Tags to associate with the resource
       */
      Tags?: string[];
    }
    namespace Responses {
      export interface $201 {
        ConsentId: string;
        ConsentType: "DomesticPayment";
        Resource: {
          Data: {
            /**
             * OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource.
             */
            ConsentId: string;
            /**
             * Date and time at which the resource was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            CreationDateTime: string; // date-time
            /**
             * Specifies the status of consent resource in code form.
             */
            Status:
              | "Authorised"
              | "AwaitingAuthorisation"
              | "Consumed"
              | "Rejected";
            /**
             * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            StatusUpdateDateTime: string; // date-time
            /**
             * Specifies to share the refund account details with PISP
             */
            ReadRefundAccount?: "No" | "Yes";
            /**
             * Specified cut-off date and time for the payment consent.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            CutOffDateTime?: string; // date-time
            /**
             * Expected execution date and time for the payment resource.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            ExpectedExecutionDateTime?: string; // date-time
            /**
             * Expected settlement date and time for the payment resource.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            ExpectedSettlementDateTime?: string; // date-time
            Charges?: {
              /**
               * Specifies which party/parties will bear the charges associated with the processing of the payment transaction.
               */
              ChargeBearer:
                | "BorneByCreditor"
                | "BorneByDebtor"
                | "FollowingServiceLevel"
                | "Shared";
              /**
               * Charge type, in a coded form.
               */
              Type: string;
              /**
               * Amount of money associated with the charge type.
               */
              Amount: {
                /**
                 * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
                 */
                Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
                /**
                 * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
                 */
                Currency: string; // ^[A-Z]{3,3}$
              };
            }[];
            /**
             * The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single domestic payment.
             */
            Initiation: {
              /**
               * Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction.
               * Usage: the  instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction.
               */
              InstructionIdentification: string;
              /**
               * Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain.
               * Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction.
               * OB: The Faster Payments Scheme can only access 31 characters for the EndToEndIdentification field.
               */
              EndToEndIdentification: string;
              /**
               * User community specific instrument.
               * Usage: This element is used to specify a local instrument, local clearing option and/or further qualify the service or service level.
               */
              LocalInstrument?: string;
              /**
               * Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party.
               * Usage: This amount has to be transported unchanged through the transaction chain.
               */
              InstructedAmount: {
                /**
                 * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
                 */
                Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
                /**
                 * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
                 */
                Currency: string; // ^[A-Z]{3,3}$
              };
              /**
               * Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction.
               */
              DebtorAccount?: {
                /**
                 * Name of the identification scheme, in a coded form as published in an external list.
                 */
                SchemeName: string;
                /**
                 * Identification assigned by an institution to identify an account. This identification is known by the account owner.
                 */
                Identification: string;
                /**
                 * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
                 * Note, the account name is not the product name or the nickname of the account.
                 */
                Name?: string;
                /**
                 * This is secondary identification of the account, as assigned by the account servicing institution.
                 * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
                 */
                SecondaryIdentification?: string;
              };
              /**
               * Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction.
               */
              CreditorAccount: {
                /**
                 * Name of the identification scheme, in a coded form as published in an external list.
                 */
                SchemeName: string;
                /**
                 * Identification assigned by an institution to identify an account. This identification is known by the account owner.
                 */
                Identification: string;
                /**
                 * The account name is the name or names of the account owner(s) represented at an account level.
                 * Note, the account name is not the product name or the nickname of the account.
                 * OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory.
                 */
                Name: string;
                /**
                 * This is secondary identification of the account, as assigned by the account servicing institution.
                 * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
                 */
                SecondaryIdentification?: string;
              };
              /**
               * Information that locates and identifies a specific address, as defined by postal services.
               */
              CreditorPostalAddress?: {
                /**
                 * Identifies the nature of the postal address.
                 */
                AddressType?:
                  | "Business"
                  | "Correspondence"
                  | "DeliveryTo"
                  | "MailTo"
                  | "POBox"
                  | "Postal"
                  | "Residential"
                  | "Statement";
                /**
                 * Identification of a division of a large organisation or building.
                 */
                Department?: string;
                /**
                 * Identification of a sub-division of a large organisation or building.
                 */
                SubDepartment?: string;
                /**
                 * Name of a street or thoroughfare.
                 */
                StreetName?: string;
                /**
                 * Number that identifies the position of a building on a street.
                 */
                BuildingNumber?: string;
                /**
                 * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
                 */
                PostCode?: string;
                /**
                 * Name of a built-up area, with defined boundaries, and a local government.
                 */
                TownName?: string;
                /**
                 * Identifies a subdivision of a country such as state, region, county.
                 */
                CountrySubDivision?: string;
                /**
                 * Nation with its own government.
                 */
                Country?: string; // ^[A-Z]{2,2}$
                AddressLine?: string[];
              };
              /**
               * Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system.
               */
              RemittanceInformation?: {
                /**
                 * Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form.
                 */
                Unstructured?: string;
                /**
                 * Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction.
                 * Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money.
                 * If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification.
                 * OB: The Faster Payments Scheme can only accept 18 characters for the ReferenceInformation field - which is where this ISO field will be mapped.
                 */
                Reference?: string;
              };
              /**
               * Additional information that can not be captured in the structured fields and/or any other specific block.
               */
              SupplementaryData?: unknown;
            };
            /**
             * The authorisation type request from the TPP.
             */
            Authorisation?: {
              /**
               * Type of authorisation flow requested.
               */
              AuthorisationType: "Any" | "Single";
              /**
               * Date and time at which the requested authorisation flow must be completed.All dates in the JSON payloads are represented in ISO 8601 date-time format.
               * All date-time fields in responses must include the timezone. An example is below:
               * 2017-04-05T10:43:07+00:00
               */
              CompletionDateTime?: string; // date-time
            };
            /**
             * Supporting Data provided by TPP, when requesting SCA Exemption.
             */
            SCASupportData?: {
              /**
               * This field allows a PISP to request specific SCA Exemption for a Payment Initiation
               */
              RequestedSCAExemptionType?:
                | "BillPayment"
                | "ContactlessTravel"
                | "EcommerceGoods"
                | "EcommerceServices"
                | "Kiosk"
                | "Parking"
                | "PartyToParty";
              /**
               * Specifies a character string with a maximum length of 40 characters.
               * Usage: This field indicates whether the PSU was subject to SCA performed by the TPP
               */
              AppliedAuthenticationApproach?: "CA" | "SCA";
              /**
               * Specifies a character string with a maximum length of 140 characters.
               * Usage: If the payment is recurring then the transaction identifier of the previous payment occurrence so that the ASPSP can verify that the PISP, amount and the payee are the same as the previous occurrence.
               */
              ReferencePaymentOrderId?: string;
            };
            /**
             * Set of elements used to identify a person or an organisation.
             */
            Debtor?: {
              /**
               * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account.
               */
              Name?: string;
            };
          };
          /**
           * The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments.
           */
          Risk: {
            /**
             * Specifies the payment context
             */
            PaymentContextCode?:
              | "BillPayment"
              | "EcommerceGoods"
              | "EcommerceServices"
              | "Other"
              | "PartyToParty";
            /**
             * Category code conform to ISO 18245, related to the type of services or goods the merchant provides for the transaction.
             */
            MerchantCategoryCode?: string;
            /**
             * The unique customer identifier of the PSU with the merchant.
             */
            MerchantCustomerIdentification?: string;
            /**
             * Information that locates and identifies a specific address, as defined by postal services or in free format text.
             */
            DeliveryAddress?: {
              AddressLine?: string[];
              /**
               * Name of a street or thoroughfare.
               */
              StreetName?: string;
              /**
               * Number that identifies the position of a building on a street.
               */
              BuildingNumber?: string;
              /**
               * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
               */
              PostCode?: string;
              /**
               * Name of a built-up area, with defined boundaries, and a local government.
               */
              TownName: string;
              /**
               * Identifies a subdivision of a country such as state, region, county.
               */
              CountrySubDivision?: string;
              /**
               * Nation with its own government, occupying a particular territory.
               */
              Country: string; // ^[A-Z]{2,2}$
            };
          };
        };
        Partnership?: {
          PartnershipId: string;
          CustomerFriendlyName: string;
          CustomerFriendlyLogoUri?: string;
        };
        /**
         * Tags associated with the resource
         */
        Tags?: string[];
      }
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "createDomesticPaymentConsent";
      method: "post";
      expressPath: "/domestic-payment-consents";
      openapiPath: "/domestic-payment-consents";
      pathParams?: unknown;
      responses:
        | Paths.CreateDomesticPaymentConsent.Responses.$201
        | Paths.CreateDomesticPaymentConsent.Responses.$400
        | Paths.CreateDomesticPaymentConsent.Responses.$500;
      successResponses: Paths.CreateDomesticPaymentConsent.Responses.$201;
      requestBody: Paths.CreateDomesticPaymentConsent.RequestBody;
      queryParams: Paths.CreateDomesticPaymentConsent.QueryParameters;
      headers?: unknown;
    }
    type Route = RequestHandler<
      unknown,
      | Paths.CreateDomesticPaymentConsent.Responses.$201
      | Paths.CreateDomesticPaymentConsent.Responses.$400
      | Paths.CreateDomesticPaymentConsent.Responses.$500,
      Paths.CreateDomesticPaymentConsent.RequestBody,
      Paths.CreateDomesticPaymentConsent.QueryParameters
    >;
  }
  namespace CreateFundsConfirmationConsent {
    namespace Parameters {
      export type PartnershipId = string;
    }
    export interface QueryParameters {
      PartnershipId: Parameters.PartnershipId;
    }
    export interface RequestBody {
      Resource: {
        Data: {
          /**
           * Specified date and time the funds confirmation authorisation will expire.
           *  If this is not populated, the authorisation will be open ended.All dates in the JSON payloads are represented in ISO 8601 date-time format.
           * All date-time fields in responses must include the timezone. An example is below:
           * 2017-04-05T10:43:07+00:00
           */
          ExpirationDateTime?: string; // date-time
          /**
           * Unambiguous identification of the account of the debtor to which a confirmation of funds consent will be applied.
           */
          DebtorAccount: {
            /**
             * Name of the identification scheme, in a coded form as published in an external list.
             */
            SchemeName: string;
            /**
             * Identification assigned by an institution to identify an account. This identification is known by the account owner.
             */
            Identification: string;
            /**
             * Name of the account, as assigned by the account servicing institution.
             * Usage: The account name is the name or names of the account owner(s) represented at an account level. The account name is not the product name or the nickname of the account.
             */
            Name?: string;
            /**
             * This is secondary identification of the account, as assigned by the account servicing institution.
             * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
             */
            SecondaryIdentification?: string;
          };
        };
      };
      /**
       * Tags to associate with the resource
       */
      Tags?: string[];
    }
    namespace Responses {
      export interface $201 {
        ConsentId: string;
        ConsentType: "FundsConfirmation";
        Partnership: {
          PartnershipId: string;
          CustomerFriendlyName: string;
          CustomerFriendlyLogoUri?: string;
        };
        Resource: {
          Data: {
            /**
             * Unique identification as assigned to identify the funds confirmation consent resource.
             */
            ConsentId: string;
            /**
             * Date and time at which the resource was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            CreationDateTime: string; // date-time
            /**
             * Specifies the status of consent resource in code form.
             */
            Status:
              | "Authorised"
              | "AwaitingAuthorisation"
              | "Rejected"
              | "Revoked";
            /**
             * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            StatusUpdateDateTime: string; // date-time
            /**
             * Specified date and time the funds confirmation authorisation will expire.
             * If this is not populated, the authorisation will be open ended.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            ExpirationDateTime?: string; // date-time
            /**
             * Unambiguous identification of the account of the debtor to which a confirmation of funds consent will be applied.
             */
            DebtorAccount: {
              /**
               * Name of the identification scheme, in a coded form as published in an external list.
               */
              SchemeName: string;
              /**
               * Identification assigned by an institution to identify an account. This identification is known by the account owner.
               */
              Identification: string;
              /**
               * Name of the account, as assigned by the account servicing institution.
               * Usage: The account name is the name or names of the account owner(s) represented at an account level. The account name is not the product name or the nickname of the account.
               */
              Name?: string;
              /**
               * This is secondary identification of the account, as assigned by the account servicing institution.
               * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
               */
              SecondaryIdentification?: string;
            };
          };
        };
        /**
         * Tags associated with the resource
         */
        Tags?: string[];
      }
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "createFundsConfirmationConsent";
      method: "post";
      expressPath: "/funds-confirmation-consents";
      openapiPath: "/funds-confirmation-consents";
      pathParams?: unknown;
      responses:
        | Paths.CreateFundsConfirmationConsent.Responses.$201
        | Paths.CreateFundsConfirmationConsent.Responses.$400
        | Paths.CreateFundsConfirmationConsent.Responses.$500;
      successResponses: Paths.CreateFundsConfirmationConsent.Responses.$201;
      requestBody: Paths.CreateFundsConfirmationConsent.RequestBody;
      queryParams: Paths.CreateFundsConfirmationConsent.QueryParameters;
      headers?: unknown;
    }
    type Route = RequestHandler<
      unknown,
      | Paths.CreateFundsConfirmationConsent.Responses.$201
      | Paths.CreateFundsConfirmationConsent.Responses.$400
      | Paths.CreateFundsConfirmationConsent.Responses.$500,
      Paths.CreateFundsConfirmationConsent.RequestBody,
      Paths.CreateFundsConfirmationConsent.QueryParameters
    >;
  }
  namespace CreateJobSchedule {
    export interface RequestBody {
      JobId: "REFRESH_PENDING_PAYMENTS" | "REFRESH_ACCOUNTS";
      Description?: string;
      /**
       * **Cron** expression that determines when the job should run. The supported format is described [here](https://github.com/harrisiirak/cron-parser)
       */
      ScheduleExpression: string;
    }
    namespace Responses {
      export interface $201 {
        ScheduleId: string;
        JobId: "REFRESH_PENDING_PAYMENTS" | "REFRESH_ACCOUNTS";
        Description?: string;
        /**
         * **Cron** expression that determines when the job should run. The supported format is described [here](https://github.com/harrisiirak/cron-parser)
         */
        ScheduleExpression: string;
        /**
         * Status of the job schedule. Only active jobs will trigger job executions.
         */
        Status: "Active" | "Inactive";
        /**
         * Time when this job will be executed next
         * example:
         * 2021-01-01T08:00:00Z
         */
        NextExecutionDateTime?: string;
        /**
         * Time when this job was executed last
         * example:
         * 2021-01-01T08:00:00Z
         */
        LastExecutionDateTime?: string;
        LastExecutionStatus?: "In progress" | "Success" | "Failure";
        Links?: {
          /**
           * Fetches previous executions of this job
           */
          Executions: string;
        };
      }
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "createJobSchedule";
      method: "post";
      expressPath: "/job-schedules";
      openapiPath: "/job-schedules";
      pathParams?: unknown;
      responses:
        | Paths.CreateJobSchedule.Responses.$201
        | Paths.CreateJobSchedule.Responses.$400
        | Paths.CreateJobSchedule.Responses.$500;
      successResponses: Paths.CreateJobSchedule.Responses.$201;
      requestBody: Paths.CreateJobSchedule.RequestBody;
      queryParams?: unknown;
      headers?: unknown;
    }
    type Route = RequestHandler<
      unknown,
      | Paths.CreateJobSchedule.Responses.$201
      | Paths.CreateJobSchedule.Responses.$400
      | Paths.CreateJobSchedule.Responses.$500,
      Paths.CreateJobSchedule.RequestBody,
      unknown
    >;
  }
  namespace CreateManualExecution {
    namespace Parameters {
      export type ScheduleId = string;
    }
    export interface QueryParameters {
      ScheduleId: Parameters.ScheduleId;
    }
    namespace Responses {
      export type $201 = string;
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "createManualExecution";
      method: "post";
      expressPath: "/job-executions";
      openapiPath: "/job-executions";
      pathParams?: unknown;
      responses:
        | Paths.CreateManualExecution.Responses.$201
        | Paths.CreateManualExecution.Responses.$400
        | Paths.CreateManualExecution.Responses.$500;
      successResponses: Paths.CreateManualExecution.Responses.$201;
      requestBody?: unknown;
      queryParams: Paths.CreateManualExecution.QueryParameters;
      headers?: unknown;
    }
    type Route = RequestHandler<
      unknown,
      | Paths.CreateManualExecution.Responses.$201
      | Paths.CreateManualExecution.Responses.$400
      | Paths.CreateManualExecution.Responses.$500,
      unknown,
      Paths.CreateManualExecution.QueryParameters
    >;
  }
  namespace DeleteAccountAccessConsent {
    namespace Parameters {
      export type ConsentId = string;
    }
    export interface PathParameters {
      ConsentId: Parameters.ConsentId;
    }
    namespace Responses {
      export interface $204 {}
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "deleteAccountAccessConsent";
      method: "delete";
      expressPath: "/account-access-consents/:ConsentId";
      openapiPath: "/account-access-consents/{ConsentId}";
      pathParams: Paths.DeleteAccountAccessConsent.PathParameters;
      responses:
        | Paths.DeleteAccountAccessConsent.Responses.$204
        | Paths.DeleteAccountAccessConsent.Responses.$400
        | Paths.DeleteAccountAccessConsent.Responses.$500;
      successResponses: Paths.DeleteAccountAccessConsent.Responses.$204;
      requestBody?: unknown;
      queryParams?: unknown;
      headers?: unknown;
    }
    type Route = RequestHandler<
      Paths.DeleteAccountAccessConsent.PathParameters,
      | Paths.DeleteAccountAccessConsent.Responses.$204
      | Paths.DeleteAccountAccessConsent.Responses.$400
      | Paths.DeleteAccountAccessConsent.Responses.$500,
      unknown,
      unknown
    >;
  }
  namespace DeleteFundsConfirmationConsent {
    namespace Parameters {
      export type ConsentId = string;
    }
    export interface PathParameters {
      ConsentId: Parameters.ConsentId;
    }
    namespace Responses {
      export interface $204 {}
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "deleteFundsConfirmationConsent";
      method: "delete";
      expressPath: "/funds-confirmation-consents/:ConsentId";
      openapiPath: "/funds-confirmation-consents/{ConsentId}";
      pathParams: Paths.DeleteFundsConfirmationConsent.PathParameters;
      responses:
        | Paths.DeleteFundsConfirmationConsent.Responses.$204
        | Paths.DeleteFundsConfirmationConsent.Responses.$400
        | Paths.DeleteFundsConfirmationConsent.Responses.$500;
      successResponses: Paths.DeleteFundsConfirmationConsent.Responses.$204;
      requestBody?: unknown;
      queryParams?: unknown;
      headers?: unknown;
    }
    type Route = RequestHandler<
      Paths.DeleteFundsConfirmationConsent.PathParameters,
      | Paths.DeleteFundsConfirmationConsent.Responses.$204
      | Paths.DeleteFundsConfirmationConsent.Responses.$400
      | Paths.DeleteFundsConfirmationConsent.Responses.$500,
      unknown,
      unknown
    >;
  }
  namespace ExecuteFundsConfirmation {
    namespace Parameters {
      export type ConsentId = string;
    }
    export interface QueryParameters {
      ConsentId: Parameters.ConsentId;
    }
    export interface RequestBody {
      Resource: {
        Data: {
          /**
           * Unique reference, as assigned by the CBPII, to unambiguously refer to the request related to the payment transaction.
           */
          Reference: string;
          /**
           * Amount of money to be confirmed as available funds in the debtor account. Contains an Amount and a Currency.
           */
          InstructedAmount: {
            /**
             * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
             */
            Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
            /**
             * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
             */
            Currency: string; // ^[A-Z]{3,3}$
          };
        };
      };
    }
    namespace Responses {
      export interface $201 {
        Resource: {
          Data: {
            /**
             * Unique identification as assigned by the ASPSP to uniquely identify the funds confirmation resource.
             */
            FundsConfirmationId: string;
            /**
             * Unique identification as assigned by the ASPSP to uniquely identify the funds confirmation consent resource.
             */
            ConsentId: string;
            /**
             * Date and time at which the resource was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            CreationDateTime: string; // date-time
            /**
             * Flag to indicate the result of a confirmation of funds check.
             */
            FundsAvailable: boolean;
            /**
             * Unique reference, as assigned by the CBPII, to unambiguously refer to the request related to the payment transaction.
             */
            Reference: string;
            /**
             * Amount of money to be confirmed as available funds in the debtor account. Contains an Amount and a Currency.
             */
            InstructedAmount: {
              /**
               * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
               */
              Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
              /**
               * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
               */
              Currency: string; // ^[A-Z]{3,3}$
            };
          };
        };
      }
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "executeFundsConfirmation";
      method: "post";
      expressPath: "/funds-confirmations";
      openapiPath: "/funds-confirmations";
      pathParams?: unknown;
      responses:
        | Paths.ExecuteFundsConfirmation.Responses.$201
        | Paths.ExecuteFundsConfirmation.Responses.$400
        | Paths.ExecuteFundsConfirmation.Responses.$500;
      successResponses: Paths.ExecuteFundsConfirmation.Responses.$201;
      requestBody: Paths.ExecuteFundsConfirmation.RequestBody;
      queryParams: Paths.ExecuteFundsConfirmation.QueryParameters;
      headers?: unknown;
    }
    type Route = RequestHandler<
      unknown,
      | Paths.ExecuteFundsConfirmation.Responses.$201
      | Paths.ExecuteFundsConfirmation.Responses.$400
      | Paths.ExecuteFundsConfirmation.Responses.$500,
      Paths.ExecuteFundsConfirmation.RequestBody,
      Paths.ExecuteFundsConfirmation.QueryParameters
    >;
  }
  namespace GetAccountAccessConsent {
    namespace Parameters {
      export type ConsentId = string;
    }
    export interface PathParameters {
      ConsentId: Parameters.ConsentId;
    }
    namespace Responses {
      export interface $200 {
        ConsentId: string;
        ConsentType: "AccountAccess";
        Partnership?: {
          PartnershipId: string;
          CustomerFriendlyName: string;
          CustomerFriendlyLogoUri?: string;
        };
        Resource: {
          Data: {
            /**
             * Unique identification as assigned to identify the account access consent resource.
             */
            ConsentId: string;
            /**
             * Date and time at which the resource was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            CreationDateTime: string; // date-time
            /**
             * Specifies the status of consent resource in code form.
             */
            Status:
              | "Authorised"
              | "AwaitingAuthorisation"
              | "Rejected"
              | "Revoked";
            /**
             * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            StatusUpdateDateTime: string; // date-time
            Permissions: (
              | "ReadAccountsBasic"
              | "ReadAccountsDetail"
              | "ReadBalances"
              | "ReadBeneficiariesBasic"
              | "ReadBeneficiariesDetail"
              | "ReadDirectDebits"
              | "ReadOffers"
              | "ReadPAN"
              | "ReadParty"
              | "ReadPartyPSU"
              | "ReadProducts"
              | "ReadScheduledPaymentsBasic"
              | "ReadScheduledPaymentsDetail"
              | "ReadStandingOrdersBasic"
              | "ReadStandingOrdersDetail"
              | "ReadStatementsBasic"
              | "ReadStatementsDetail"
              | "ReadTransactionsBasic"
              | "ReadTransactionsCredits"
              | "ReadTransactionsDebits"
              | "ReadTransactionsDetail"
            )[];
            /**
             * Specified date and time the permissions will expire.
             * If this is not populated, the permissions will be open ended.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            ExpirationDateTime?: string; // date-time
            /**
             * Specified start date and time for the transaction query period.
             * If this is not populated, the start date will be open ended, and data will be returned from the earliest available transaction.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            TransactionFromDateTime?: string; // date-time
            /**
             * Specified end date and time for the transaction query period.
             * If this is not populated, the end date will be open ended, and data will be returned to the latest available transaction.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            TransactionToDateTime?: string; // date-time
          };
          /**
           * The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Account Info.
           */
          Risk: unknown;
        };
        /**
         * Tags associated with the resource
         */
        Tags?: string[];
      }
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "getAccountAccessConsent";
      method: "get";
      expressPath: "/account-access-consents/:ConsentId";
      openapiPath: "/account-access-consents/{ConsentId}";
      pathParams: Paths.GetAccountAccessConsent.PathParameters;
      responses:
        | Paths.GetAccountAccessConsent.Responses.$200
        | Paths.GetAccountAccessConsent.Responses.$400
        | Paths.GetAccountAccessConsent.Responses.$500;
      successResponses: Paths.GetAccountAccessConsent.Responses.$200;
      requestBody?: unknown;
      queryParams?: unknown;
      headers?: unknown;
    }
    type Route = RequestHandler<
      Paths.GetAccountAccessConsent.PathParameters,
      | Paths.GetAccountAccessConsent.Responses.$200
      | Paths.GetAccountAccessConsent.Responses.$400
      | Paths.GetAccountAccessConsent.Responses.$500,
      unknown,
      unknown
    >;
  }
  namespace GetAccountAccessConsents {
    namespace Parameters {
      export type Page = number;
      export type PageSize = number;
      export type PartnershipId = string;
      export type Tags = string[];
    }
    export interface QueryParameters {
      PartnershipId?: Parameters.PartnershipId;
      Tags?: Parameters.Tags;
      PageSize?: Parameters.PageSize;
      Page?: Parameters.Page;
    }
    namespace Responses {
      export interface $200 {
        Items: {
          ConsentId: string;
          ConsentType: "AccountAccess";
          Partnership?: {
            PartnershipId: string;
            CustomerFriendlyName: string;
            CustomerFriendlyLogoUri?: string;
          };
          Resource: {
            Data: {
              /**
               * Unique identification as assigned to identify the account access consent resource.
               */
              ConsentId: string;
              /**
               * Date and time at which the resource was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
               * All date-time fields in responses must include the timezone. An example is below:
               * 2017-04-05T10:43:07+00:00
               */
              CreationDateTime: string; // date-time
              /**
               * Specifies the status of consent resource in code form.
               */
              Status:
                | "Authorised"
                | "AwaitingAuthorisation"
                | "Rejected"
                | "Revoked";
              /**
               * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
               * All date-time fields in responses must include the timezone. An example is below:
               * 2017-04-05T10:43:07+00:00
               */
              StatusUpdateDateTime: string; // date-time
              Permissions: (
                | "ReadAccountsBasic"
                | "ReadAccountsDetail"
                | "ReadBalances"
                | "ReadBeneficiariesBasic"
                | "ReadBeneficiariesDetail"
                | "ReadDirectDebits"
                | "ReadOffers"
                | "ReadPAN"
                | "ReadParty"
                | "ReadPartyPSU"
                | "ReadProducts"
                | "ReadScheduledPaymentsBasic"
                | "ReadScheduledPaymentsDetail"
                | "ReadStandingOrdersBasic"
                | "ReadStandingOrdersDetail"
                | "ReadStatementsBasic"
                | "ReadStatementsDetail"
                | "ReadTransactionsBasic"
                | "ReadTransactionsCredits"
                | "ReadTransactionsDebits"
                | "ReadTransactionsDetail"
              )[];
              /**
               * Specified date and time the permissions will expire.
               * If this is not populated, the permissions will be open ended.All dates in the JSON payloads are represented in ISO 8601 date-time format.
               * All date-time fields in responses must include the timezone. An example is below:
               * 2017-04-05T10:43:07+00:00
               */
              ExpirationDateTime?: string; // date-time
              /**
               * Specified start date and time for the transaction query period.
               * If this is not populated, the start date will be open ended, and data will be returned from the earliest available transaction.All dates in the JSON payloads are represented in ISO 8601 date-time format.
               * All date-time fields in responses must include the timezone. An example is below:
               * 2017-04-05T10:43:07+00:00
               */
              TransactionFromDateTime?: string; // date-time
              /**
               * Specified end date and time for the transaction query period.
               * If this is not populated, the end date will be open ended, and data will be returned to the latest available transaction.All dates in the JSON payloads are represented in ISO 8601 date-time format.
               * All date-time fields in responses must include the timezone. An example is below:
               * 2017-04-05T10:43:07+00:00
               */
              TransactionToDateTime?: string; // date-time
            };
            /**
             * The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Account Info.
             */
            Risk: unknown;
          };
          /**
           * Tags associated with the resource
           */
          Tags?: string[];
        }[];
        /**
         * Information about the results
         */
        Meta: {
          /**
           * Maximum number of results return in a single request
           */
          PageSize: number;
          /**
           * Number of the previous page. If empty, means the current page is the first one
           */
          PreviousPage?: number;
          /**
           * Number of the next page. If empty, means the current page is the last one
           */
          NextPage?: number;
          /**
           * Total number of pages found
           */
          PageCount: number;
          /**
           * Total number of items found
           */
          ItemCount: number;
        };
        Links: {
          Self: string;
          Next?: string;
          Prev?: string;
        };
      }
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "getAccountAccessConsents";
      method: "get";
      expressPath: "/account-access-consents";
      openapiPath: "/account-access-consents";
      pathParams?: unknown;
      responses:
        | Paths.GetAccountAccessConsents.Responses.$200
        | Paths.GetAccountAccessConsents.Responses.$400
        | Paths.GetAccountAccessConsents.Responses.$500;
      successResponses: Paths.GetAccountAccessConsents.Responses.$200;
      requestBody?: unknown;
      queryParams: Paths.GetAccountAccessConsents.QueryParameters;
      headers?: unknown;
    }
    type Route = RequestHandler<
      unknown,
      | Paths.GetAccountAccessConsents.Responses.$200
      | Paths.GetAccountAccessConsents.Responses.$400
      | Paths.GetAccountAccessConsents.Responses.$500,
      unknown,
      Paths.GetAccountAccessConsents.QueryParameters
    >;
  }
  namespace GetAccountBalance {
    namespace Parameters {
      export type AccountId = string;
      export type Page = number;
      export type PageSize = number;
    }
    export interface PathParameters {
      AccountId: Parameters.AccountId;
    }
    export interface QueryParameters {
      PageSize?: Parameters.PageSize;
      Page?: Parameters.Page;
    }
    namespace Responses {
      export interface $200 {
        Items: {
          /**
           * Set of elements used to define the balance details.
           */
          Resource: {
            /**
             * A unique and immutable identifier used to identify the account resource. This identifier has no meaning to the account owner.
             */
            AccountId: string;
            /**
             * Indicates whether the balance is a credit or a debit balance.
             * Usage: A zero balance is considered to be a credit balance.
             */
            CreditDebitIndicator: "Credit" | "Debit";
            /**
             * Balance type, in a coded form.
             */
            Type:
              | "ClosingAvailable"
              | "ClosingBooked"
              | "ClosingCleared"
              | "Expected"
              | "ForwardAvailable"
              | "Information"
              | "InterimAvailable"
              | "InterimBooked"
              | "InterimCleared"
              | "OpeningAvailable"
              | "OpeningBooked"
              | "OpeningCleared"
              | "PreviouslyClosedBooked";
            /**
             * Indicates the date (and time) of the balance.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            DateTime: string; // date-time
            /**
             * Amount of money of the cash balance.
             */
            Amount: {
              /**
               * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
               */
              Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
              /**
               * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
               */
              Currency: string; // ^[A-Z]{3,3}$
            };
            CreditLine?: {
              /**
               * Indicates whether or not the credit line is included in the balance of the account.
               * Usage: If not present, credit line is not included in the balance amount of the account.
               */
              Included: boolean;
              /**
               * Limit type, in a coded form.
               */
              Type?:
                | "Available"
                | "Credit"
                | "Emergency"
                | "Pre-Agreed"
                | "Temporary";
              /**
               * Amount of money of the credit line.
               */
              Amount?: {
                /**
                 * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
                 */
                Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
                /**
                 * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
                 */
                Currency: string; // ^[A-Z]{3,3}$
              };
            }[];
          };
        }[];
        /**
         * Information about the results
         */
        Meta: {
          /**
           * Maximum number of results return in a single request
           */
          PageSize: number;
          /**
           * Number of the previous page. If empty, means the current page is the first one
           */
          PreviousPage?: number;
          /**
           * Number of the next page. If empty, means the current page is the last one
           */
          NextPage?: number;
          /**
           * Total number of pages found
           */
          PageCount: number;
          /**
           * Total number of items found
           */
          ItemCount: number;
        };
        Links: {
          Self: string;
          Next?: string;
          Prev?: string;
        };
      }
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "getAccountBalance";
      method: "get";
      expressPath: "/accounts/:AccountId/balances";
      openapiPath: "/accounts/{AccountId}/balances";
      pathParams: Paths.GetAccountBalance.PathParameters;
      responses:
        | Paths.GetAccountBalance.Responses.$200
        | Paths.GetAccountBalance.Responses.$400
        | Paths.GetAccountBalance.Responses.$500;
      successResponses: Paths.GetAccountBalance.Responses.$200;
      requestBody?: unknown;
      queryParams: Paths.GetAccountBalance.QueryParameters;
      headers?: unknown;
    }
    type Route = RequestHandler<
      Paths.GetAccountBalance.PathParameters,
      | Paths.GetAccountBalance.Responses.$200
      | Paths.GetAccountBalance.Responses.$400
      | Paths.GetAccountBalance.Responses.$500,
      unknown,
      Paths.GetAccountBalance.QueryParameters
    >;
  }
  namespace GetAccountTransactions {
    namespace Parameters {
      export type AccountId = string;
      export type FromBookingDateTime = string;
      export type Page = number;
      export type PageSize = number;
      export type ToBookingDateTime = string;
    }
    export interface PathParameters {
      AccountId: Parameters.AccountId;
    }
    export interface QueryParameters {
      FromBookingDateTime?: Parameters.FromBookingDateTime;
      ToBookingDateTime?: Parameters.ToBookingDateTime;
      PageSize?: Parameters.PageSize;
      Page?: Parameters.Page;
    }
    namespace Responses {
      export interface $200 {
        Items: {
          /**
           * Provides further details on an entry in the report.
           */
          Resource: {
            /**
             * A unique and immutable identifier used to identify the account resource. This identifier has no meaning to the account owner.
             */
            AccountId: string;
            /**
             * Unique identifier for the transaction within an servicing institution. This identifier is both unique and immutable.
             */
            TransactionId?: string;
            /**
             * Unique reference for the transaction. This reference is optionally populated, and may as an example be the FPID in the Faster Payments context.
             */
            TransactionReference?: string;
            StatementReference?: string[];
            /**
             * Indicates whether the transaction is a credit or a debit entry.
             */
            CreditDebitIndicator: "Credit" | "Debit";
            /**
             * Status of a transaction entry on the books of the account servicer.
             */
            Status: "Booked" | "Pending";
            /**
             * Specifies the Mutability of the Transaction record.
             */
            TransactionMutability?: "Mutable" | "Immutable";
            /**
             * Date and time when a transaction entry is posted to an account on the account servicer's books.
             * Usage: Booking date is the expected booking date, unless the status is booked, in which case it is the actual booking date.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            BookingDateTime: string; // date-time
            /**
             * Date and time at which assets become available to the account owner in case of a credit entry, or cease to be available to the account owner in case of a debit transaction entry.
             * Usage: If transaction entry status is pending and value date is present, then the value date refers to an expected/requested value date.
             * For transaction entries subject to availability/float and for which availability information is provided, the value date must not be used. In this case the availability component identifies the number of availability days.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            ValueDateTime?: string; // date-time
            /**
             * Further details of the transaction.
             * This is the transaction narrative, which is unstructured text.
             */
            TransactionInformation?: string;
            /**
             * Information that locates and identifies a specific address for a transaction entry, that is presented in free format text.
             */
            AddressLine?: string;
            /**
             * Amount of money in the cash transaction entry.
             */
            Amount: {
              /**
               * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
               */
              Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
              /**
               * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
               */
              Currency: string; // ^[A-Z]{3,3}$
            };
            /**
             * Transaction charges to be paid by the charge bearer.
             */
            ChargeAmount?: {
              /**
               * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
               */
              Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
              /**
               * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
               */
              Currency: string; // ^[A-Z]{3,3}$
            };
            /**
             * Set of elements used to provide details on the currency exchange.
             */
            CurrencyExchange?: {
              /**
               * Currency from which an amount is to be converted in a currency conversion.
               */
              SourceCurrency: string; // ^[A-Z]{3,3}$
              /**
               * Currency into which an amount is to be converted in a currency conversion.
               */
              TargetCurrency?: string; // ^[A-Z]{3,3}$
              /**
               * Currency in which the rate of exchange is expressed in a currency exchange. In the example 1GBP = xxxCUR, the unit currency is GBP.
               */
              UnitCurrency?: string; // ^[A-Z]{3,3}$
              /**
               * Factor used to convert an amount from one currency into another. This reflects the price at which one currency was bought with another currency.
               * Usage: ExchangeRate expresses the ratio between UnitCurrency and QuotedCurrency (ExchangeRate = UnitCurrency/QuotedCurrency).
               */
              ExchangeRate: number;
              /**
               * Unique identification to unambiguously identify the foreign exchange contract.
               */
              ContractIdentification?: string;
              /**
               * Date and time at which an exchange rate is quoted.All dates in the JSON payloads are represented in ISO 8601 date-time format.
               * All date-time fields in responses must include the timezone. An example is below:
               * 2017-04-05T10:43:07+00:00
               */
              QuotationDate?: string; // date-time
              /**
               * Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party.
               */
              InstructedAmount?: {
                /**
                 * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
                 */
                Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
                /**
                 * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
                 */
                Currency: string; // ^[A-Z]{3,3}$
              };
            };
            /**
             * Set of elements used to fully identify the type of underlying transaction resulting in an entry.
             */
            BankTransactionCode?: {
              /**
               * Specifies the family within a domain.
               */
              Code: string;
              /**
               * Specifies the sub-product family within a specific family.
               */
              SubCode: string;
            };
            /**
             * Set of elements to fully identify a proprietary bank transaction code.
             */
            ProprietaryBankTransactionCode?: {
              /**
               * Proprietary bank transaction code to identify the underlying transaction.
               */
              Code: string;
              /**
               * Identification of the issuer of the proprietary bank transaction code.
               */
              Issuer?: string;
            };
            /**
             * Set of elements used to define the balance as a numerical representation of the net increases and decreases in an account after a transaction entry is applied to the account.
             */
            Balance?: {
              /**
               * Indicates whether the balance is a credit or a debit balance.
               * Usage: A zero balance is considered to be a credit balance.
               */
              CreditDebitIndicator: "Credit" | "Debit";
              /**
               * Balance type, in a coded form.
               */
              Type:
                | "ClosingAvailable"
                | "ClosingBooked"
                | "ClosingCleared"
                | "Expected"
                | "ForwardAvailable"
                | "Information"
                | "InterimAvailable"
                | "InterimBooked"
                | "InterimCleared"
                | "OpeningAvailable"
                | "OpeningBooked"
                | "OpeningCleared"
                | "PreviouslyClosedBooked";
              /**
               * Amount of money of the cash balance after a transaction entry is applied to the account..
               */
              Amount: {
                /**
                 * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
                 */
                Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
                /**
                 * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
                 */
                Currency: string; // ^[A-Z]{3,3}$
              };
            };
            /**
             * Details of the merchant involved in the transaction.
             */
            MerchantDetails?: {
              /**
               * Name by which the merchant is known.
               */
              MerchantName?: string;
              /**
               * Category code conform to ISO 18245, related to the type of services or goods the merchant provides for the transaction.
               */
              MerchantCategoryCode?: string;
            };
            /**
             * Financial institution servicing an account for the creditor.
             */
            CreditorAgent?: {
              /**
               * Name of the identification scheme, in a coded form as published in an external list.
               */
              SchemeName?: string;
              /**
               * Unique and unambiguous identification of a financial institution or a branch of a financial institution.
               */
              Identification?: string;
              /**
               * Name by which an agent is known and which is usually used to identify that agent.
               */
              Name?: string;
              /**
               * Information that locates and identifies a specific address, as defined by postal services.
               */
              PostalAddress?: {
                /**
                 * Identifies the nature of the postal address.
                 */
                AddressType?:
                  | "Business"
                  | "Correspondence"
                  | "DeliveryTo"
                  | "MailTo"
                  | "POBox"
                  | "Postal"
                  | "Residential"
                  | "Statement";
                /**
                 * Identification of a division of a large organisation or building.
                 */
                Department?: string;
                /**
                 * Identification of a sub-division of a large organisation or building.
                 */
                SubDepartment?: string;
                /**
                 * Name of a street or thoroughfare.
                 */
                StreetName?: string;
                /**
                 * Number that identifies the position of a building on a street.
                 */
                BuildingNumber?: string;
                /**
                 * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
                 */
                PostCode?: string;
                /**
                 * Name of a built-up area, with defined boundaries, and a local government.
                 */
                TownName?: string;
                /**
                 * Identifies a subdivision of a country such as state, region, county.
                 */
                CountrySubDivision?: string;
                /**
                 * Nation with its own government.
                 */
                Country?: string; // ^[A-Z]{2,2}$
                AddressLine?: string[];
              };
            };
            /**
             * Unambiguous identification of the account of the creditor, in the case of a debit transaction.
             */
            CreditorAccount?: {
              /**
               * Name of the identification scheme, in a coded form as published in an external list.
               */
              SchemeName?: string;
              /**
               * Identification assigned by an institution to identify an account. This identification is known by the account owner.
               */
              Identification?: string;
              /**
               * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
               * Note, the account name is not the product name or the nickname of the account.
               */
              Name?: string;
              /**
               * This is secondary identification of the account, as assigned by the account servicing institution.
               * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
               */
              SecondaryIdentification?: string;
            };
            /**
             * Financial institution servicing an account for the debtor.
             */
            DebtorAgent?: {
              /**
               * Name of the identification scheme, in a coded form as published in an external list.
               */
              SchemeName?: string;
              /**
               * Unique and unambiguous identification of a financial institution or a branch of a financial institution.
               */
              Identification?: string;
              /**
               * Name by which an agent is known and which is usually used to identify that agent.
               */
              Name?: string;
              /**
               * Information that locates and identifies a specific address, as defined by postal services.
               */
              PostalAddress?: {
                /**
                 * Identifies the nature of the postal address.
                 */
                AddressType?:
                  | "Business"
                  | "Correspondence"
                  | "DeliveryTo"
                  | "MailTo"
                  | "POBox"
                  | "Postal"
                  | "Residential"
                  | "Statement";
                /**
                 * Identification of a division of a large organisation or building.
                 */
                Department?: string;
                /**
                 * Identification of a sub-division of a large organisation or building.
                 */
                SubDepartment?: string;
                /**
                 * Name of a street or thoroughfare.
                 */
                StreetName?: string;
                /**
                 * Number that identifies the position of a building on a street.
                 */
                BuildingNumber?: string;
                /**
                 * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
                 */
                PostCode?: string;
                /**
                 * Name of a built-up area, with defined boundaries, and a local government.
                 */
                TownName?: string;
                /**
                 * Identifies a subdivision of a country such as state, region, county.
                 */
                CountrySubDivision?: string;
                /**
                 * Nation with its own government.
                 */
                Country?: string; // ^[A-Z]{2,2}$
                AddressLine?: string[];
              };
            };
            /**
             * Unambiguous identification of the account of the debtor, in the case of a crebit transaction.
             */
            DebtorAccount?: {
              /**
               * Name of the identification scheme, in a coded form as published in an external list.
               */
              SchemeName?: string;
              /**
               * Identification assigned by an institution to identify an account. This identification is known by the account owner.
               */
              Identification?: string;
              /**
               * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
               * Note, the account name is not the product name or the nickname of the account.
               */
              Name?: string;
              /**
               * This is secondary identification of the account, as assigned by the account servicing institution.
               * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
               */
              SecondaryIdentification?: string;
            };
            /**
             * Set of elements to describe the card instrument used in the transaction.
             */
            CardInstrument?: {
              /**
               * Name of the card scheme.
               */
              CardSchemeName:
                | "AmericanExpress"
                | "Diners"
                | "Discover"
                | "MasterCard"
                | "VISA";
              /**
               * The card authorisation type.
               */
              AuthorisationType?:
                | "ConsumerDevice"
                | "Contactless"
                | "None"
                | "PIN";
              /**
               * Name of the cardholder using the card instrument.
               */
              Name?: string;
              /**
               * Identification assigned by an institution to identify the card instrument used in the transaction. This identification is known by the account owner, and may be masked.
               */
              Identification?: string;
            };
            /**
             * Additional information that can not be captured in the structured fields and/or any other specific block.
             */
            SupplementaryData?: unknown;
          };
        }[];
        /**
         * Information about the results
         */
        Meta: {
          /**
           * Maximum number of results return in a single request
           */
          PageSize: number;
          /**
           * Number of the previous page. If empty, means the current page is the first one
           */
          PreviousPage?: number;
          /**
           * Number of the next page. If empty, means the current page is the last one
           */
          NextPage?: number;
          /**
           * Total number of pages found
           */
          PageCount: number;
          /**
           * Total number of items found
           */
          ItemCount: number;
        };
        Links: {
          Self: string;
          Next?: string;
          Prev?: string;
        };
      }
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "getAccountTransactions";
      method: "get";
      expressPath: "/accounts/:AccountId/transactions";
      openapiPath: "/accounts/{AccountId}/transactions";
      pathParams: Paths.GetAccountTransactions.PathParameters;
      responses:
        | Paths.GetAccountTransactions.Responses.$200
        | Paths.GetAccountTransactions.Responses.$400
        | Paths.GetAccountTransactions.Responses.$500;
      successResponses: Paths.GetAccountTransactions.Responses.$200;
      requestBody?: unknown;
      queryParams: Paths.GetAccountTransactions.QueryParameters;
      headers?: unknown;
    }
    type Route = RequestHandler<
      Paths.GetAccountTransactions.PathParameters,
      | Paths.GetAccountTransactions.Responses.$200
      | Paths.GetAccountTransactions.Responses.$400
      | Paths.GetAccountTransactions.Responses.$500,
      unknown,
      Paths.GetAccountTransactions.QueryParameters
    >;
  }
  namespace GetAccounts {
    namespace Parameters {
      export type ConsentId = string;
      export type Page = number;
      export type PageSize = number;
      export type Tags = string[];
    }
    export interface QueryParameters {
      ConsentId?: Parameters.ConsentId;
      Tags?: Parameters.Tags;
      PageSize?: Parameters.PageSize;
      Page?: Parameters.Page;
    }
    namespace Responses {
      export interface $200 {
        Items: {
          AccountId: string;
          Resource: {
            /**
             * Unambiguous identification of the account to which credit and debit entries are made.
             */
            Data: {
              /**
               * A unique and immutable identifier used to identify the account resource. This identifier has no meaning to the account owner.
               */
              AccountId: string;
              /**
               * Specifies the status of account resource in code form.
               */
              Status?:
                | "Deleted"
                | "Disabled"
                | "Enabled"
                | "Pending"
                | "ProForma";
              /**
               * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
               * All date-time fields in responses must include the timezone. An example is below:
               * 2017-04-05T10:43:07+00:00
               */
              StatusUpdateDateTime?: string; // date-time
              /**
               * Identification of the currency in which the account is held.
               * Usage: Currency should only be used in case one and the same account number covers several currencies
               * and the initiating party needs to identify which currency needs to be used for settlement on the account.
               */
              Currency: string; // ^[A-Z]{3,3}$
              /**
               * Specifies the type of account (personal or business).
               */
              AccountType: "Business" | "Personal";
              /**
               * Specifies the sub type of account (product family group).
               */
              AccountSubType:
                | "ChargeCard"
                | "CreditCard"
                | "CurrentAccount"
                | "EMoney"
                | "Loan"
                | "Mortgage"
                | "PrePaidCard"
                | "Savings";
              /**
               * Specifies the description of the account type.
               */
              Description?: string;
              /**
               * The nickname of the account, assigned by the account owner in order to provide an additional means of identification of the account.
               */
              Nickname?: string;
              /**
               * Date on which the account and related basic services are effectively operational for the account owner.All dates in the JSON payloads are represented in ISO 8601 date-time format.
               * All date-time fields in responses must include the timezone. An example is below:
               * 2017-04-05T10:43:07+00:00
               */
              OpeningDate?: string; // date-time
              /**
               * Maturity date of the account.All dates in the JSON payloads are represented in ISO 8601 date-time format.
               * All date-time fields in responses must include the timezone. An example is below:
               * 2017-04-05T10:43:07+00:00
               */
              MaturityDate?: string; // date-time
              /**
               * Specifies the switch status for the account, in a coded form.
               */
              SwitchStatus?: string;
              Account?: {
                /**
                 * Name of the identification scheme, in a coded form as published in an external list.
                 */
                SchemeName: string;
                /**
                 * Identification assigned by an institution to identify an account. This identification is known by the account owner.
                 */
                Identification: string;
                /**
                 * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
                 * Note, the account name is not the product name or the nickname of the account.
                 */
                Name?: string;
                /**
                 * This is secondary identification of the account, as assigned by the account servicing institution.
                 * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
                 */
                SecondaryIdentification?: string;
              }[];
              /**
               * Party that manages the account on behalf of the account owner, that is manages the registration and booking of entries on the account, calculates balances on the account and provides information about the account.
               */
              Servicer?: {
                /**
                 * Name of the identification scheme, in a coded form as published in an external list.
                 */
                SchemeName: string;
                /**
                 * Unique and unambiguous identification of the servicing institution.
                 */
                Identification: string;
              };
            };
          };
          Partnership: {
            PartnershipId: string;
            CustomerFriendlyName: string;
            CustomerFriendlyLogoUri?: string;
          };
          /**
           * Tags associated with the resource
           */
          Tags?: string[];
        }[];
        /**
         * Information about the results
         */
        Meta: {
          /**
           * Maximum number of results return in a single request
           */
          PageSize: number;
          /**
           * Number of the previous page. If empty, means the current page is the first one
           */
          PreviousPage?: number;
          /**
           * Number of the next page. If empty, means the current page is the last one
           */
          NextPage?: number;
          /**
           * Total number of pages found
           */
          PageCount: number;
          /**
           * Total number of items found
           */
          ItemCount: number;
        };
        Links: {
          Self: string;
          Next?: string;
          Prev?: string;
        };
      }
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "getAccounts";
      method: "get";
      expressPath: "/accounts";
      openapiPath: "/accounts";
      pathParams?: unknown;
      responses:
        | Paths.GetAccounts.Responses.$200
        | Paths.GetAccounts.Responses.$400
        | Paths.GetAccounts.Responses.$500;
      successResponses: Paths.GetAccounts.Responses.$200;
      requestBody?: unknown;
      queryParams: Paths.GetAccounts.QueryParameters;
      headers?: unknown;
    }
    type Route = RequestHandler<
      unknown,
      | Paths.GetAccounts.Responses.$200
      | Paths.GetAccounts.Responses.$400
      | Paths.GetAccounts.Responses.$500,
      unknown,
      Paths.GetAccounts.QueryParameters
    >;
  }
  namespace GetDomesticPayment {
    namespace Parameters {
      export type PaymentId = string;
    }
    export interface PathParameters {
      PaymentId: Parameters.PaymentId;
    }
    namespace Responses {
      export interface $200 {
        PaymentId: string;
        PaymentType: "DomesticPayment";
        Resource: {
          Data: {
            /**
             * OB: Unique identification as assigned by the ASPSP to uniquely identify the domestic payment resource.
             */
            DomesticPaymentId: string;
            /**
             * OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource.
             */
            ConsentId: string;
            /**
             * Date and time at which the message was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            CreationDateTime: string; // date-time
            /**
             * Specifies the status of the payment information group.
             */
            Status:
              | "AcceptedCreditSettlementCompleted"
              | "AcceptedSettlementCompleted"
              | "AcceptedSettlementInProcess"
              | "AcceptedWithoutPosting"
              | "Pending"
              | "Rejected";
            /**
             * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            StatusUpdateDateTime: string; // date-time
            /**
             * Expected execution date and time for the payment resource.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            ExpectedExecutionDateTime?: string; // date-time
            /**
             * Expected settlement date and time for the payment resource.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            ExpectedSettlementDateTime?: string; // date-time
            /**
             * Unambiguous identification of the refund account to which a refund will be made as a result of the transaction.
             */
            Refund?: {
              /**
               * Provides the details to identify an account.
               */
              Account: {
                /**
                 * Name of the identification scheme, in a coded form as published in an external list.
                 */
                SchemeName: string;
                /**
                 * Identification assigned by an institution to identify an account. This identification is known by the account owner.
                 */
                Identification: string;
                /**
                 * Name of the account, as assigned by the account servicing institution.
                 * Usage: The account name is the name or names of the account owner(s) represented at an account level. The account name is not the product name or the nickname of the account.
                 * OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory.
                 */
                Name: string;
                /**
                 * This is secondary identification of the account, as assigned by the account servicing institution.
                 * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
                 */
                SecondaryIdentification?: string;
              };
            };
            Charges?: {
              /**
               * Specifies which party/parties will bear the charges associated with the processing of the payment transaction.
               */
              ChargeBearer:
                | "BorneByCreditor"
                | "BorneByDebtor"
                | "FollowingServiceLevel"
                | "Shared";
              /**
               * Charge type, in a coded form.
               */
              Type: string;
              /**
               * Amount of money associated with the charge type.
               */
              Amount: {
                /**
                 * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
                 */
                Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
                /**
                 * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
                 */
                Currency: string; // ^[A-Z]{3,3}$
              };
            }[];
            /**
             * The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single domestic payment.
             */
            Initiation: {
              /**
               * Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction.
               * Usage: the  instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction.
               */
              InstructionIdentification: string;
              /**
               * Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain.
               * Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction.
               * OB: The Faster Payments Scheme can only access 31 characters for the EndToEndIdentification field.
               */
              EndToEndIdentification: string;
              /**
               * User community specific instrument.
               * Usage: This element is used to specify a local instrument, local clearing option and/or further qualify the service or service level.
               */
              LocalInstrument?: string;
              /**
               * Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party.
               * Usage: This amount has to be transported unchanged through the transaction chain.
               */
              InstructedAmount: {
                /**
                 * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
                 */
                Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
                /**
                 * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
                 */
                Currency: string; // ^[A-Z]{3,3}$
              };
              /**
               * Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction.
               */
              DebtorAccount?: {
                /**
                 * Name of the identification scheme, in a coded form as published in an external list.
                 */
                SchemeName: string;
                /**
                 * Identification assigned by an institution to identify an account. This identification is known by the account owner.
                 */
                Identification: string;
                /**
                 * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
                 * Note, the account name is not the product name or the nickname of the account.
                 */
                Name?: string;
                /**
                 * This is secondary identification of the account, as assigned by the account servicing institution.
                 * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
                 */
                SecondaryIdentification?: string;
              };
              /**
               * Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction.
               */
              CreditorAccount: {
                /**
                 * Name of the identification scheme, in a coded form as published in an external list.
                 */
                SchemeName: string;
                /**
                 * Identification assigned by an institution to identify an account. This identification is known by the account owner.
                 */
                Identification: string;
                /**
                 * The account name is the name or names of the account owner(s) represented at an account level.
                 * Note, the account name is not the product name or the nickname of the account.
                 * OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory.
                 */
                Name: string;
                /**
                 * This is secondary identification of the account, as assigned by the account servicing institution.
                 * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
                 */
                SecondaryIdentification?: string;
              };
              /**
               * Information that locates and identifies a specific address, as defined by postal services.
               */
              CreditorPostalAddress?: {
                /**
                 * Identifies the nature of the postal address.
                 */
                AddressType?:
                  | "Business"
                  | "Correspondence"
                  | "DeliveryTo"
                  | "MailTo"
                  | "POBox"
                  | "Postal"
                  | "Residential"
                  | "Statement";
                /**
                 * Identification of a division of a large organisation or building.
                 */
                Department?: string;
                /**
                 * Identification of a sub-division of a large organisation or building.
                 */
                SubDepartment?: string;
                /**
                 * Name of a street or thoroughfare.
                 */
                StreetName?: string;
                /**
                 * Number that identifies the position of a building on a street.
                 */
                BuildingNumber?: string;
                /**
                 * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
                 */
                PostCode?: string;
                /**
                 * Name of a built-up area, with defined boundaries, and a local government.
                 */
                TownName?: string;
                /**
                 * Identifies a subdivision of a country such as state, region, county.
                 */
                CountrySubDivision?: string;
                /**
                 * Nation with its own government.
                 */
                Country?: string; // ^[A-Z]{2,2}$
                AddressLine?: string[];
              };
              /**
               * Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system.
               */
              RemittanceInformation?: {
                /**
                 * Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form.
                 */
                Unstructured?: string;
                /**
                 * Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction.
                 * Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money.
                 * If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification.
                 * OB: The Faster Payments Scheme can only accept 18 characters for the ReferenceInformation field - which is where this ISO field will be mapped.
                 */
                Reference?: string;
              };
              /**
               * Additional information that can not be captured in the structured fields and/or any other specific block.
               */
              SupplementaryData?: unknown;
            };
            /**
             * The multiple authorisation flow response from the ASPSP.
             */
            MultiAuthorisation?: {
              /**
               * Specifies the status of the authorisation flow in code form.
               */
              Status:
                | "Authorised"
                | "AwaitingFurtherAuthorisation"
                | "Rejected";
              /**
               * Number of authorisations required for payment order (total required at the start of the multi authorisation journey).
               */
              NumberRequired?: number;
              /**
               * Number of authorisations received.
               */
              NumberReceived?: number;
              /**
               * Last date and time at the authorisation flow was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
               * All date-time fields in responses must include the timezone. An example is below:
               * 2017-04-05T10:43:07+00:00
               */
              LastUpdateDateTime?: string; // date-time
              /**
               * Date and time at which the requested authorisation flow must be completed.All dates in the JSON payloads are represented in ISO 8601 date-time format.
               * All date-time fields in responses must include the timezone. An example is below:
               * 2017-04-05T10:43:07+00:00
               */
              ExpirationDateTime?: string; // date-time
            };
            /**
             * Set of elements used to identify a person or an organisation.
             */
            Debtor?: {
              /**
               * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account.
               */
              Name?: string;
            };
          };
        };
        /**
         * Tags associated with the resource
         */
        Tags?: string[];
      }
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "getDomesticPayment";
      method: "get";
      expressPath: "/domestic-payments/:PaymentId";
      openapiPath: "/domestic-payments/{PaymentId}";
      pathParams: Paths.GetDomesticPayment.PathParameters;
      responses:
        | Paths.GetDomesticPayment.Responses.$200
        | Paths.GetDomesticPayment.Responses.$400
        | Paths.GetDomesticPayment.Responses.$500;
      successResponses: Paths.GetDomesticPayment.Responses.$200;
      requestBody?: unknown;
      queryParams?: unknown;
      headers?: unknown;
    }
    type Route = RequestHandler<
      Paths.GetDomesticPayment.PathParameters,
      | Paths.GetDomesticPayment.Responses.$200
      | Paths.GetDomesticPayment.Responses.$400
      | Paths.GetDomesticPayment.Responses.$500,
      unknown,
      unknown
    >;
  }
  namespace GetDomesticPaymentConsent {
    namespace Parameters {
      export type ConsentId = string;
    }
    export interface PathParameters {
      ConsentId: Parameters.ConsentId;
    }
    namespace Responses {
      export interface $200 {
        ConsentId: string;
        ConsentType: "DomesticPayment";
        Resource: {
          Data: {
            /**
             * OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource.
             */
            ConsentId: string;
            /**
             * Date and time at which the resource was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            CreationDateTime: string; // date-time
            /**
             * Specifies the status of consent resource in code form.
             */
            Status:
              | "Authorised"
              | "AwaitingAuthorisation"
              | "Consumed"
              | "Rejected";
            /**
             * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            StatusUpdateDateTime: string; // date-time
            /**
             * Specifies to share the refund account details with PISP
             */
            ReadRefundAccount?: "No" | "Yes";
            /**
             * Specified cut-off date and time for the payment consent.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            CutOffDateTime?: string; // date-time
            /**
             * Expected execution date and time for the payment resource.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            ExpectedExecutionDateTime?: string; // date-time
            /**
             * Expected settlement date and time for the payment resource.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            ExpectedSettlementDateTime?: string; // date-time
            Charges?: {
              /**
               * Specifies which party/parties will bear the charges associated with the processing of the payment transaction.
               */
              ChargeBearer:
                | "BorneByCreditor"
                | "BorneByDebtor"
                | "FollowingServiceLevel"
                | "Shared";
              /**
               * Charge type, in a coded form.
               */
              Type: string;
              /**
               * Amount of money associated with the charge type.
               */
              Amount: {
                /**
                 * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
                 */
                Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
                /**
                 * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
                 */
                Currency: string; // ^[A-Z]{3,3}$
              };
            }[];
            /**
             * The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single domestic payment.
             */
            Initiation: {
              /**
               * Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction.
               * Usage: the  instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction.
               */
              InstructionIdentification: string;
              /**
               * Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain.
               * Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction.
               * OB: The Faster Payments Scheme can only access 31 characters for the EndToEndIdentification field.
               */
              EndToEndIdentification: string;
              /**
               * User community specific instrument.
               * Usage: This element is used to specify a local instrument, local clearing option and/or further qualify the service or service level.
               */
              LocalInstrument?: string;
              /**
               * Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party.
               * Usage: This amount has to be transported unchanged through the transaction chain.
               */
              InstructedAmount: {
                /**
                 * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
                 */
                Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
                /**
                 * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
                 */
                Currency: string; // ^[A-Z]{3,3}$
              };
              /**
               * Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction.
               */
              DebtorAccount?: {
                /**
                 * Name of the identification scheme, in a coded form as published in an external list.
                 */
                SchemeName: string;
                /**
                 * Identification assigned by an institution to identify an account. This identification is known by the account owner.
                 */
                Identification: string;
                /**
                 * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
                 * Note, the account name is not the product name or the nickname of the account.
                 */
                Name?: string;
                /**
                 * This is secondary identification of the account, as assigned by the account servicing institution.
                 * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
                 */
                SecondaryIdentification?: string;
              };
              /**
               * Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction.
               */
              CreditorAccount: {
                /**
                 * Name of the identification scheme, in a coded form as published in an external list.
                 */
                SchemeName: string;
                /**
                 * Identification assigned by an institution to identify an account. This identification is known by the account owner.
                 */
                Identification: string;
                /**
                 * The account name is the name or names of the account owner(s) represented at an account level.
                 * Note, the account name is not the product name or the nickname of the account.
                 * OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory.
                 */
                Name: string;
                /**
                 * This is secondary identification of the account, as assigned by the account servicing institution.
                 * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
                 */
                SecondaryIdentification?: string;
              };
              /**
               * Information that locates and identifies a specific address, as defined by postal services.
               */
              CreditorPostalAddress?: {
                /**
                 * Identifies the nature of the postal address.
                 */
                AddressType?:
                  | "Business"
                  | "Correspondence"
                  | "DeliveryTo"
                  | "MailTo"
                  | "POBox"
                  | "Postal"
                  | "Residential"
                  | "Statement";
                /**
                 * Identification of a division of a large organisation or building.
                 */
                Department?: string;
                /**
                 * Identification of a sub-division of a large organisation or building.
                 */
                SubDepartment?: string;
                /**
                 * Name of a street or thoroughfare.
                 */
                StreetName?: string;
                /**
                 * Number that identifies the position of a building on a street.
                 */
                BuildingNumber?: string;
                /**
                 * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
                 */
                PostCode?: string;
                /**
                 * Name of a built-up area, with defined boundaries, and a local government.
                 */
                TownName?: string;
                /**
                 * Identifies a subdivision of a country such as state, region, county.
                 */
                CountrySubDivision?: string;
                /**
                 * Nation with its own government.
                 */
                Country?: string; // ^[A-Z]{2,2}$
                AddressLine?: string[];
              };
              /**
               * Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system.
               */
              RemittanceInformation?: {
                /**
                 * Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form.
                 */
                Unstructured?: string;
                /**
                 * Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction.
                 * Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money.
                 * If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification.
                 * OB: The Faster Payments Scheme can only accept 18 characters for the ReferenceInformation field - which is where this ISO field will be mapped.
                 */
                Reference?: string;
              };
              /**
               * Additional information that can not be captured in the structured fields and/or any other specific block.
               */
              SupplementaryData?: unknown;
            };
            /**
             * The authorisation type request from the TPP.
             */
            Authorisation?: {
              /**
               * Type of authorisation flow requested.
               */
              AuthorisationType: "Any" | "Single";
              /**
               * Date and time at which the requested authorisation flow must be completed.All dates in the JSON payloads are represented in ISO 8601 date-time format.
               * All date-time fields in responses must include the timezone. An example is below:
               * 2017-04-05T10:43:07+00:00
               */
              CompletionDateTime?: string; // date-time
            };
            /**
             * Supporting Data provided by TPP, when requesting SCA Exemption.
             */
            SCASupportData?: {
              /**
               * This field allows a PISP to request specific SCA Exemption for a Payment Initiation
               */
              RequestedSCAExemptionType?:
                | "BillPayment"
                | "ContactlessTravel"
                | "EcommerceGoods"
                | "EcommerceServices"
                | "Kiosk"
                | "Parking"
                | "PartyToParty";
              /**
               * Specifies a character string with a maximum length of 40 characters.
               * Usage: This field indicates whether the PSU was subject to SCA performed by the TPP
               */
              AppliedAuthenticationApproach?: "CA" | "SCA";
              /**
               * Specifies a character string with a maximum length of 140 characters.
               * Usage: If the payment is recurring then the transaction identifier of the previous payment occurrence so that the ASPSP can verify that the PISP, amount and the payee are the same as the previous occurrence.
               */
              ReferencePaymentOrderId?: string;
            };
            /**
             * Set of elements used to identify a person or an organisation.
             */
            Debtor?: {
              /**
               * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account.
               */
              Name?: string;
            };
          };
          /**
           * The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments.
           */
          Risk: {
            /**
             * Specifies the payment context
             */
            PaymentContextCode?:
              | "BillPayment"
              | "EcommerceGoods"
              | "EcommerceServices"
              | "Other"
              | "PartyToParty";
            /**
             * Category code conform to ISO 18245, related to the type of services or goods the merchant provides for the transaction.
             */
            MerchantCategoryCode?: string;
            /**
             * The unique customer identifier of the PSU with the merchant.
             */
            MerchantCustomerIdentification?: string;
            /**
             * Information that locates and identifies a specific address, as defined by postal services or in free format text.
             */
            DeliveryAddress?: {
              AddressLine?: string[];
              /**
               * Name of a street or thoroughfare.
               */
              StreetName?: string;
              /**
               * Number that identifies the position of a building on a street.
               */
              BuildingNumber?: string;
              /**
               * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
               */
              PostCode?: string;
              /**
               * Name of a built-up area, with defined boundaries, and a local government.
               */
              TownName: string;
              /**
               * Identifies a subdivision of a country such as state, region, county.
               */
              CountrySubDivision?: string;
              /**
               * Nation with its own government, occupying a particular territory.
               */
              Country: string; // ^[A-Z]{2,2}$
            };
          };
        };
        Partnership?: {
          PartnershipId: string;
          CustomerFriendlyName: string;
          CustomerFriendlyLogoUri?: string;
        };
        /**
         * Tags associated with the resource
         */
        Tags?: string[];
      }
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "getDomesticPaymentConsent";
      method: "get";
      expressPath: "/domestic-payment-consents/:ConsentId";
      openapiPath: "/domestic-payment-consents/{ConsentId}";
      pathParams: Paths.GetDomesticPaymentConsent.PathParameters;
      responses:
        | Paths.GetDomesticPaymentConsent.Responses.$200
        | Paths.GetDomesticPaymentConsent.Responses.$400
        | Paths.GetDomesticPaymentConsent.Responses.$500;
      successResponses: Paths.GetDomesticPaymentConsent.Responses.$200;
      requestBody?: unknown;
      queryParams?: unknown;
      headers?: unknown;
    }
    type Route = RequestHandler<
      Paths.GetDomesticPaymentConsent.PathParameters,
      | Paths.GetDomesticPaymentConsent.Responses.$200
      | Paths.GetDomesticPaymentConsent.Responses.$400
      | Paths.GetDomesticPaymentConsent.Responses.$500,
      unknown,
      unknown
    >;
  }
  namespace GetDomesticPaymentConsents {
    namespace Parameters {
      export type Page = number;
      export type PageSize = number;
      export type PartnershipId = string;
      export type Tags = string[];
    }
    export interface QueryParameters {
      PartnershipId?: Parameters.PartnershipId;
      Tags?: Parameters.Tags;
      PageSize?: Parameters.PageSize;
      Page?: Parameters.Page;
    }
    namespace Responses {
      export interface $200 {
        Items: {
          ConsentId: string;
          ConsentType: "DomesticPayment";
          Resource: {
            Data: {
              /**
               * OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource.
               */
              ConsentId: string;
              /**
               * Date and time at which the resource was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
               * All date-time fields in responses must include the timezone. An example is below:
               * 2017-04-05T10:43:07+00:00
               */
              CreationDateTime: string; // date-time
              /**
               * Specifies the status of consent resource in code form.
               */
              Status:
                | "Authorised"
                | "AwaitingAuthorisation"
                | "Consumed"
                | "Rejected";
              /**
               * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
               * All date-time fields in responses must include the timezone. An example is below:
               * 2017-04-05T10:43:07+00:00
               */
              StatusUpdateDateTime: string; // date-time
              /**
               * Specifies to share the refund account details with PISP
               */
              ReadRefundAccount?: "No" | "Yes";
              /**
               * Specified cut-off date and time for the payment consent.All dates in the JSON payloads are represented in ISO 8601 date-time format.
               * All date-time fields in responses must include the timezone. An example is below:
               * 2017-04-05T10:43:07+00:00
               */
              CutOffDateTime?: string; // date-time
              /**
               * Expected execution date and time for the payment resource.All dates in the JSON payloads are represented in ISO 8601 date-time format.
               * All date-time fields in responses must include the timezone. An example is below:
               * 2017-04-05T10:43:07+00:00
               */
              ExpectedExecutionDateTime?: string; // date-time
              /**
               * Expected settlement date and time for the payment resource.All dates in the JSON payloads are represented in ISO 8601 date-time format.
               * All date-time fields in responses must include the timezone. An example is below:
               * 2017-04-05T10:43:07+00:00
               */
              ExpectedSettlementDateTime?: string; // date-time
              Charges?: {
                /**
                 * Specifies which party/parties will bear the charges associated with the processing of the payment transaction.
                 */
                ChargeBearer:
                  | "BorneByCreditor"
                  | "BorneByDebtor"
                  | "FollowingServiceLevel"
                  | "Shared";
                /**
                 * Charge type, in a coded form.
                 */
                Type: string;
                /**
                 * Amount of money associated with the charge type.
                 */
                Amount: {
                  /**
                   * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
                   */
                  Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
                  /**
                   * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
                   */
                  Currency: string; // ^[A-Z]{3,3}$
                };
              }[];
              /**
               * The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single domestic payment.
               */
              Initiation: {
                /**
                 * Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction.
                 * Usage: the  instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction.
                 */
                InstructionIdentification: string;
                /**
                 * Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain.
                 * Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction.
                 * OB: The Faster Payments Scheme can only access 31 characters for the EndToEndIdentification field.
                 */
                EndToEndIdentification: string;
                /**
                 * User community specific instrument.
                 * Usage: This element is used to specify a local instrument, local clearing option and/or further qualify the service or service level.
                 */
                LocalInstrument?: string;
                /**
                 * Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party.
                 * Usage: This amount has to be transported unchanged through the transaction chain.
                 */
                InstructedAmount: {
                  /**
                   * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
                   */
                  Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
                  /**
                   * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
                   */
                  Currency: string; // ^[A-Z]{3,3}$
                };
                /**
                 * Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction.
                 */
                DebtorAccount?: {
                  /**
                   * Name of the identification scheme, in a coded form as published in an external list.
                   */
                  SchemeName: string;
                  /**
                   * Identification assigned by an institution to identify an account. This identification is known by the account owner.
                   */
                  Identification: string;
                  /**
                   * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
                   * Note, the account name is not the product name or the nickname of the account.
                   */
                  Name?: string;
                  /**
                   * This is secondary identification of the account, as assigned by the account servicing institution.
                   * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
                   */
                  SecondaryIdentification?: string;
                };
                /**
                 * Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction.
                 */
                CreditorAccount: {
                  /**
                   * Name of the identification scheme, in a coded form as published in an external list.
                   */
                  SchemeName: string;
                  /**
                   * Identification assigned by an institution to identify an account. This identification is known by the account owner.
                   */
                  Identification: string;
                  /**
                   * The account name is the name or names of the account owner(s) represented at an account level.
                   * Note, the account name is not the product name or the nickname of the account.
                   * OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory.
                   */
                  Name: string;
                  /**
                   * This is secondary identification of the account, as assigned by the account servicing institution.
                   * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
                   */
                  SecondaryIdentification?: string;
                };
                /**
                 * Information that locates and identifies a specific address, as defined by postal services.
                 */
                CreditorPostalAddress?: {
                  /**
                   * Identifies the nature of the postal address.
                   */
                  AddressType?:
                    | "Business"
                    | "Correspondence"
                    | "DeliveryTo"
                    | "MailTo"
                    | "POBox"
                    | "Postal"
                    | "Residential"
                    | "Statement";
                  /**
                   * Identification of a division of a large organisation or building.
                   */
                  Department?: string;
                  /**
                   * Identification of a sub-division of a large organisation or building.
                   */
                  SubDepartment?: string;
                  /**
                   * Name of a street or thoroughfare.
                   */
                  StreetName?: string;
                  /**
                   * Number that identifies the position of a building on a street.
                   */
                  BuildingNumber?: string;
                  /**
                   * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
                   */
                  PostCode?: string;
                  /**
                   * Name of a built-up area, with defined boundaries, and a local government.
                   */
                  TownName?: string;
                  /**
                   * Identifies a subdivision of a country such as state, region, county.
                   */
                  CountrySubDivision?: string;
                  /**
                   * Nation with its own government.
                   */
                  Country?: string; // ^[A-Z]{2,2}$
                  AddressLine?: string[];
                };
                /**
                 * Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system.
                 */
                RemittanceInformation?: {
                  /**
                   * Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form.
                   */
                  Unstructured?: string;
                  /**
                   * Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction.
                   * Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money.
                   * If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification.
                   * OB: The Faster Payments Scheme can only accept 18 characters for the ReferenceInformation field - which is where this ISO field will be mapped.
                   */
                  Reference?: string;
                };
                /**
                 * Additional information that can not be captured in the structured fields and/or any other specific block.
                 */
                SupplementaryData?: unknown;
              };
              /**
               * The authorisation type request from the TPP.
               */
              Authorisation?: {
                /**
                 * Type of authorisation flow requested.
                 */
                AuthorisationType: "Any" | "Single";
                /**
                 * Date and time at which the requested authorisation flow must be completed.All dates in the JSON payloads are represented in ISO 8601 date-time format.
                 * All date-time fields in responses must include the timezone. An example is below:
                 * 2017-04-05T10:43:07+00:00
                 */
                CompletionDateTime?: string; // date-time
              };
              /**
               * Supporting Data provided by TPP, when requesting SCA Exemption.
               */
              SCASupportData?: {
                /**
                 * This field allows a PISP to request specific SCA Exemption for a Payment Initiation
                 */
                RequestedSCAExemptionType?:
                  | "BillPayment"
                  | "ContactlessTravel"
                  | "EcommerceGoods"
                  | "EcommerceServices"
                  | "Kiosk"
                  | "Parking"
                  | "PartyToParty";
                /**
                 * Specifies a character string with a maximum length of 40 characters.
                 * Usage: This field indicates whether the PSU was subject to SCA performed by the TPP
                 */
                AppliedAuthenticationApproach?: "CA" | "SCA";
                /**
                 * Specifies a character string with a maximum length of 140 characters.
                 * Usage: If the payment is recurring then the transaction identifier of the previous payment occurrence so that the ASPSP can verify that the PISP, amount and the payee are the same as the previous occurrence.
                 */
                ReferencePaymentOrderId?: string;
              };
              /**
               * Set of elements used to identify a person or an organisation.
               */
              Debtor?: {
                /**
                 * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account.
                 */
                Name?: string;
              };
            };
            /**
             * The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments.
             */
            Risk: {
              /**
               * Specifies the payment context
               */
              PaymentContextCode?:
                | "BillPayment"
                | "EcommerceGoods"
                | "EcommerceServices"
                | "Other"
                | "PartyToParty";
              /**
               * Category code conform to ISO 18245, related to the type of services or goods the merchant provides for the transaction.
               */
              MerchantCategoryCode?: string;
              /**
               * The unique customer identifier of the PSU with the merchant.
               */
              MerchantCustomerIdentification?: string;
              /**
               * Information that locates and identifies a specific address, as defined by postal services or in free format text.
               */
              DeliveryAddress?: {
                AddressLine?: string[];
                /**
                 * Name of a street or thoroughfare.
                 */
                StreetName?: string;
                /**
                 * Number that identifies the position of a building on a street.
                 */
                BuildingNumber?: string;
                /**
                 * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
                 */
                PostCode?: string;
                /**
                 * Name of a built-up area, with defined boundaries, and a local government.
                 */
                TownName: string;
                /**
                 * Identifies a subdivision of a country such as state, region, county.
                 */
                CountrySubDivision?: string;
                /**
                 * Nation with its own government, occupying a particular territory.
                 */
                Country: string; // ^[A-Z]{2,2}$
              };
            };
          };
          Partnership?: {
            PartnershipId: string;
            CustomerFriendlyName: string;
            CustomerFriendlyLogoUri?: string;
          };
          /**
           * Tags associated with the resource
           */
          Tags?: string[];
        }[];
        /**
         * Information about the results
         */
        Meta: {
          /**
           * Maximum number of results return in a single request
           */
          PageSize: number;
          /**
           * Number of the previous page. If empty, means the current page is the first one
           */
          PreviousPage?: number;
          /**
           * Number of the next page. If empty, means the current page is the last one
           */
          NextPage?: number;
          /**
           * Total number of pages found
           */
          PageCount: number;
          /**
           * Total number of items found
           */
          ItemCount: number;
        };
        Links: {
          Self: string;
          Next?: string;
          Prev?: string;
        };
      }
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "getDomesticPaymentConsents";
      method: "get";
      expressPath: "/domestic-payment-consents";
      openapiPath: "/domestic-payment-consents";
      pathParams?: unknown;
      responses:
        | Paths.GetDomesticPaymentConsents.Responses.$200
        | Paths.GetDomesticPaymentConsents.Responses.$400
        | Paths.GetDomesticPaymentConsents.Responses.$500;
      successResponses: Paths.GetDomesticPaymentConsents.Responses.$200;
      requestBody?: unknown;
      queryParams: Paths.GetDomesticPaymentConsents.QueryParameters;
      headers?: unknown;
    }
    type Route = RequestHandler<
      unknown,
      | Paths.GetDomesticPaymentConsents.Responses.$200
      | Paths.GetDomesticPaymentConsents.Responses.$400
      | Paths.GetDomesticPaymentConsents.Responses.$500,
      unknown,
      Paths.GetDomesticPaymentConsents.QueryParameters
    >;
  }
  namespace GetDomesticPaymentFundsConfirmation {
    namespace Parameters {
      export type ConsentId = string;
    }
    export interface PathParameters {
      ConsentId: Parameters.ConsentId;
    }
    namespace Responses {
      export interface $200 {
        Resource: {
          Data: {
            /**
             * Result of a funds availability check.
             */
            FundsAvailableResult?: {
              /**
               * Date and time at which the funds availability check was generated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
               * All date-time fields in responses must include the timezone. An example is below:
               * 2017-04-05T10:43:07+00:00
               */
              FundsAvailableDateTime: string; // date-time
              /**
               * Flag to indicate the availability of funds given the Amount in the consent request.
               */
              FundsAvailable: boolean;
            };
            /**
             * Additional information that can not be captured in the structured fields and/or any other specific block.
             */
            SupplementaryData?: unknown;
          };
        };
      }
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "getDomesticPaymentFundsConfirmation";
      method: "get";
      expressPath: "/domestic-payment-consents/:ConsentId/funds-confirmation";
      openapiPath: "/domestic-payment-consents/{ConsentId}/funds-confirmation";
      pathParams: Paths.GetDomesticPaymentFundsConfirmation.PathParameters;
      responses:
        | Paths.GetDomesticPaymentFundsConfirmation.Responses.$200
        | Paths.GetDomesticPaymentFundsConfirmation.Responses.$400
        | Paths.GetDomesticPaymentFundsConfirmation.Responses.$500;
      successResponses: Paths.GetDomesticPaymentFundsConfirmation.Responses.$200;
      requestBody?: unknown;
      queryParams?: unknown;
      headers?: unknown;
    }
    type Route = RequestHandler<
      Paths.GetDomesticPaymentFundsConfirmation.PathParameters,
      | Paths.GetDomesticPaymentFundsConfirmation.Responses.$200
      | Paths.GetDomesticPaymentFundsConfirmation.Responses.$400
      | Paths.GetDomesticPaymentFundsConfirmation.Responses.$500,
      unknown,
      unknown
    >;
  }
  namespace GetDomesticPayments {
    namespace Parameters {
      export type ConsentId = string;
      export type Page = number;
      export type PageSize = number;
      export type Tags = string[];
    }
    export interface QueryParameters {
      ConsentId?: Parameters.ConsentId;
      Tags?: Parameters.Tags;
      PageSize?: Parameters.PageSize;
      Page?: Parameters.Page;
    }
    namespace Responses {
      export interface $200 {
        Items: {
          PaymentId: string;
          PaymentType: "DomesticPayment";
          Resource: {
            Data: {
              /**
               * OB: Unique identification as assigned by the ASPSP to uniquely identify the domestic payment resource.
               */
              DomesticPaymentId: string;
              /**
               * OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource.
               */
              ConsentId: string;
              /**
               * Date and time at which the message was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
               * All date-time fields in responses must include the timezone. An example is below:
               * 2017-04-05T10:43:07+00:00
               */
              CreationDateTime: string; // date-time
              /**
               * Specifies the status of the payment information group.
               */
              Status:
                | "AcceptedCreditSettlementCompleted"
                | "AcceptedSettlementCompleted"
                | "AcceptedSettlementInProcess"
                | "AcceptedWithoutPosting"
                | "Pending"
                | "Rejected";
              /**
               * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
               * All date-time fields in responses must include the timezone. An example is below:
               * 2017-04-05T10:43:07+00:00
               */
              StatusUpdateDateTime: string; // date-time
              /**
               * Expected execution date and time for the payment resource.All dates in the JSON payloads are represented in ISO 8601 date-time format.
               * All date-time fields in responses must include the timezone. An example is below:
               * 2017-04-05T10:43:07+00:00
               */
              ExpectedExecutionDateTime?: string; // date-time
              /**
               * Expected settlement date and time for the payment resource.All dates in the JSON payloads are represented in ISO 8601 date-time format.
               * All date-time fields in responses must include the timezone. An example is below:
               * 2017-04-05T10:43:07+00:00
               */
              ExpectedSettlementDateTime?: string; // date-time
              /**
               * Unambiguous identification of the refund account to which a refund will be made as a result of the transaction.
               */
              Refund?: {
                /**
                 * Provides the details to identify an account.
                 */
                Account: {
                  /**
                   * Name of the identification scheme, in a coded form as published in an external list.
                   */
                  SchemeName: string;
                  /**
                   * Identification assigned by an institution to identify an account. This identification is known by the account owner.
                   */
                  Identification: string;
                  /**
                   * Name of the account, as assigned by the account servicing institution.
                   * Usage: The account name is the name or names of the account owner(s) represented at an account level. The account name is not the product name or the nickname of the account.
                   * OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory.
                   */
                  Name: string;
                  /**
                   * This is secondary identification of the account, as assigned by the account servicing institution.
                   * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
                   */
                  SecondaryIdentification?: string;
                };
              };
              Charges?: {
                /**
                 * Specifies which party/parties will bear the charges associated with the processing of the payment transaction.
                 */
                ChargeBearer:
                  | "BorneByCreditor"
                  | "BorneByDebtor"
                  | "FollowingServiceLevel"
                  | "Shared";
                /**
                 * Charge type, in a coded form.
                 */
                Type: string;
                /**
                 * Amount of money associated with the charge type.
                 */
                Amount: {
                  /**
                   * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
                   */
                  Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
                  /**
                   * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
                   */
                  Currency: string; // ^[A-Z]{3,3}$
                };
              }[];
              /**
               * The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single domestic payment.
               */
              Initiation: {
                /**
                 * Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction.
                 * Usage: the  instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction.
                 */
                InstructionIdentification: string;
                /**
                 * Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain.
                 * Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction.
                 * OB: The Faster Payments Scheme can only access 31 characters for the EndToEndIdentification field.
                 */
                EndToEndIdentification: string;
                /**
                 * User community specific instrument.
                 * Usage: This element is used to specify a local instrument, local clearing option and/or further qualify the service or service level.
                 */
                LocalInstrument?: string;
                /**
                 * Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party.
                 * Usage: This amount has to be transported unchanged through the transaction chain.
                 */
                InstructedAmount: {
                  /**
                   * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
                   */
                  Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
                  /**
                   * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
                   */
                  Currency: string; // ^[A-Z]{3,3}$
                };
                /**
                 * Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction.
                 */
                DebtorAccount?: {
                  /**
                   * Name of the identification scheme, in a coded form as published in an external list.
                   */
                  SchemeName: string;
                  /**
                   * Identification assigned by an institution to identify an account. This identification is known by the account owner.
                   */
                  Identification: string;
                  /**
                   * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
                   * Note, the account name is not the product name or the nickname of the account.
                   */
                  Name?: string;
                  /**
                   * This is secondary identification of the account, as assigned by the account servicing institution.
                   * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
                   */
                  SecondaryIdentification?: string;
                };
                /**
                 * Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction.
                 */
                CreditorAccount: {
                  /**
                   * Name of the identification scheme, in a coded form as published in an external list.
                   */
                  SchemeName: string;
                  /**
                   * Identification assigned by an institution to identify an account. This identification is known by the account owner.
                   */
                  Identification: string;
                  /**
                   * The account name is the name or names of the account owner(s) represented at an account level.
                   * Note, the account name is not the product name or the nickname of the account.
                   * OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory.
                   */
                  Name: string;
                  /**
                   * This is secondary identification of the account, as assigned by the account servicing institution.
                   * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
                   */
                  SecondaryIdentification?: string;
                };
                /**
                 * Information that locates and identifies a specific address, as defined by postal services.
                 */
                CreditorPostalAddress?: {
                  /**
                   * Identifies the nature of the postal address.
                   */
                  AddressType?:
                    | "Business"
                    | "Correspondence"
                    | "DeliveryTo"
                    | "MailTo"
                    | "POBox"
                    | "Postal"
                    | "Residential"
                    | "Statement";
                  /**
                   * Identification of a division of a large organisation or building.
                   */
                  Department?: string;
                  /**
                   * Identification of a sub-division of a large organisation or building.
                   */
                  SubDepartment?: string;
                  /**
                   * Name of a street or thoroughfare.
                   */
                  StreetName?: string;
                  /**
                   * Number that identifies the position of a building on a street.
                   */
                  BuildingNumber?: string;
                  /**
                   * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
                   */
                  PostCode?: string;
                  /**
                   * Name of a built-up area, with defined boundaries, and a local government.
                   */
                  TownName?: string;
                  /**
                   * Identifies a subdivision of a country such as state, region, county.
                   */
                  CountrySubDivision?: string;
                  /**
                   * Nation with its own government.
                   */
                  Country?: string; // ^[A-Z]{2,2}$
                  AddressLine?: string[];
                };
                /**
                 * Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system.
                 */
                RemittanceInformation?: {
                  /**
                   * Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form.
                   */
                  Unstructured?: string;
                  /**
                   * Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction.
                   * Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money.
                   * If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification.
                   * OB: The Faster Payments Scheme can only accept 18 characters for the ReferenceInformation field - which is where this ISO field will be mapped.
                   */
                  Reference?: string;
                };
                /**
                 * Additional information that can not be captured in the structured fields and/or any other specific block.
                 */
                SupplementaryData?: unknown;
              };
              /**
               * The multiple authorisation flow response from the ASPSP.
               */
              MultiAuthorisation?: {
                /**
                 * Specifies the status of the authorisation flow in code form.
                 */
                Status:
                  | "Authorised"
                  | "AwaitingFurtherAuthorisation"
                  | "Rejected";
                /**
                 * Number of authorisations required for payment order (total required at the start of the multi authorisation journey).
                 */
                NumberRequired?: number;
                /**
                 * Number of authorisations received.
                 */
                NumberReceived?: number;
                /**
                 * Last date and time at the authorisation flow was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
                 * All date-time fields in responses must include the timezone. An example is below:
                 * 2017-04-05T10:43:07+00:00
                 */
                LastUpdateDateTime?: string; // date-time
                /**
                 * Date and time at which the requested authorisation flow must be completed.All dates in the JSON payloads are represented in ISO 8601 date-time format.
                 * All date-time fields in responses must include the timezone. An example is below:
                 * 2017-04-05T10:43:07+00:00
                 */
                ExpirationDateTime?: string; // date-time
              };
              /**
               * Set of elements used to identify a person or an organisation.
               */
              Debtor?: {
                /**
                 * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account.
                 */
                Name?: string;
              };
            };
          };
          /**
           * Tags associated with the resource
           */
          Tags?: string[];
        }[];
        /**
         * Information about the results
         */
        Meta: {
          /**
           * Maximum number of results return in a single request
           */
          PageSize: number;
          /**
           * Number of the previous page. If empty, means the current page is the first one
           */
          PreviousPage?: number;
          /**
           * Number of the next page. If empty, means the current page is the last one
           */
          NextPage?: number;
          /**
           * Total number of pages found
           */
          PageCount: number;
          /**
           * Total number of items found
           */
          ItemCount: number;
        };
        Links: {
          Self: string;
          Next?: string;
          Prev?: string;
        };
      }
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "getDomesticPayments";
      method: "get";
      expressPath: "/domestic-payments";
      openapiPath: "/domestic-payments";
      pathParams?: unknown;
      responses:
        | Paths.GetDomesticPayments.Responses.$200
        | Paths.GetDomesticPayments.Responses.$400
        | Paths.GetDomesticPayments.Responses.$500;
      successResponses: Paths.GetDomesticPayments.Responses.$200;
      requestBody?: unknown;
      queryParams: Paths.GetDomesticPayments.QueryParameters;
      headers?: unknown;
    }
    type Route = RequestHandler<
      unknown,
      | Paths.GetDomesticPayments.Responses.$200
      | Paths.GetDomesticPayments.Responses.$400
      | Paths.GetDomesticPayments.Responses.$500,
      unknown,
      Paths.GetDomesticPayments.QueryParameters
    >;
  }
  namespace GetFundsConfirmationConsent {
    namespace Parameters {
      export type ConsentId = string;
    }
    export interface PathParameters {
      ConsentId: Parameters.ConsentId;
    }
    namespace Responses {
      export interface $200 {
        ConsentId: string;
        ConsentType: "FundsConfirmation";
        Partnership: {
          PartnershipId: string;
          CustomerFriendlyName: string;
          CustomerFriendlyLogoUri?: string;
        };
        Resource: {
          Data: {
            /**
             * Unique identification as assigned to identify the funds confirmation consent resource.
             */
            ConsentId: string;
            /**
             * Date and time at which the resource was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            CreationDateTime: string; // date-time
            /**
             * Specifies the status of consent resource in code form.
             */
            Status:
              | "Authorised"
              | "AwaitingAuthorisation"
              | "Rejected"
              | "Revoked";
            /**
             * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            StatusUpdateDateTime: string; // date-time
            /**
             * Specified date and time the funds confirmation authorisation will expire.
             * If this is not populated, the authorisation will be open ended.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            ExpirationDateTime?: string; // date-time
            /**
             * Unambiguous identification of the account of the debtor to which a confirmation of funds consent will be applied.
             */
            DebtorAccount: {
              /**
               * Name of the identification scheme, in a coded form as published in an external list.
               */
              SchemeName: string;
              /**
               * Identification assigned by an institution to identify an account. This identification is known by the account owner.
               */
              Identification: string;
              /**
               * Name of the account, as assigned by the account servicing institution.
               * Usage: The account name is the name or names of the account owner(s) represented at an account level. The account name is not the product name or the nickname of the account.
               */
              Name?: string;
              /**
               * This is secondary identification of the account, as assigned by the account servicing institution.
               * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
               */
              SecondaryIdentification?: string;
            };
          };
        };
        /**
         * Tags associated with the resource
         */
        Tags?: string[];
      }
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "getFundsConfirmationConsent";
      method: "get";
      expressPath: "/funds-confirmation-consents/:ConsentId";
      openapiPath: "/funds-confirmation-consents/{ConsentId}";
      pathParams: Paths.GetFundsConfirmationConsent.PathParameters;
      responses:
        | Paths.GetFundsConfirmationConsent.Responses.$200
        | Paths.GetFundsConfirmationConsent.Responses.$400
        | Paths.GetFundsConfirmationConsent.Responses.$500;
      successResponses: Paths.GetFundsConfirmationConsent.Responses.$200;
      requestBody?: unknown;
      queryParams?: unknown;
      headers?: unknown;
    }
    type Route = RequestHandler<
      Paths.GetFundsConfirmationConsent.PathParameters,
      | Paths.GetFundsConfirmationConsent.Responses.$200
      | Paths.GetFundsConfirmationConsent.Responses.$400
      | Paths.GetFundsConfirmationConsent.Responses.$500,
      unknown,
      unknown
    >;
  }
  namespace GetFundsConfirmationConsents {
    namespace Parameters {
      export type Page = number;
      export type PageSize = number;
      export type PartnershipId = string;
      export type Tags = string[];
    }
    export interface QueryParameters {
      PartnershipId?: Parameters.PartnershipId;
      Tags?: Parameters.Tags;
      PageSize?: Parameters.PageSize;
      Page?: Parameters.Page;
    }
    namespace Responses {
      export interface $200 {
        Items: {
          ConsentId: string;
          ConsentType: "FundsConfirmation";
          Partnership: {
            PartnershipId: string;
            CustomerFriendlyName: string;
            CustomerFriendlyLogoUri?: string;
          };
          Resource: {
            Data: {
              /**
               * Unique identification as assigned to identify the funds confirmation consent resource.
               */
              ConsentId: string;
              /**
               * Date and time at which the resource was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
               * All date-time fields in responses must include the timezone. An example is below:
               * 2017-04-05T10:43:07+00:00
               */
              CreationDateTime: string; // date-time
              /**
               * Specifies the status of consent resource in code form.
               */
              Status:
                | "Authorised"
                | "AwaitingAuthorisation"
                | "Rejected"
                | "Revoked";
              /**
               * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
               * All date-time fields in responses must include the timezone. An example is below:
               * 2017-04-05T10:43:07+00:00
               */
              StatusUpdateDateTime: string; // date-time
              /**
               * Specified date and time the funds confirmation authorisation will expire.
               * If this is not populated, the authorisation will be open ended.All dates in the JSON payloads are represented in ISO 8601 date-time format.
               * All date-time fields in responses must include the timezone. An example is below:
               * 2017-04-05T10:43:07+00:00
               */
              ExpirationDateTime?: string; // date-time
              /**
               * Unambiguous identification of the account of the debtor to which a confirmation of funds consent will be applied.
               */
              DebtorAccount: {
                /**
                 * Name of the identification scheme, in a coded form as published in an external list.
                 */
                SchemeName: string;
                /**
                 * Identification assigned by an institution to identify an account. This identification is known by the account owner.
                 */
                Identification: string;
                /**
                 * Name of the account, as assigned by the account servicing institution.
                 * Usage: The account name is the name or names of the account owner(s) represented at an account level. The account name is not the product name or the nickname of the account.
                 */
                Name?: string;
                /**
                 * This is secondary identification of the account, as assigned by the account servicing institution.
                 * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
                 */
                SecondaryIdentification?: string;
              };
            };
          };
          /**
           * Tags associated with the resource
           */
          Tags?: string[];
        }[];
        /**
         * Information about the results
         */
        Meta: {
          /**
           * Maximum number of results return in a single request
           */
          PageSize: number;
          /**
           * Number of the previous page. If empty, means the current page is the first one
           */
          PreviousPage?: number;
          /**
           * Number of the next page. If empty, means the current page is the last one
           */
          NextPage?: number;
          /**
           * Total number of pages found
           */
          PageCount: number;
          /**
           * Total number of items found
           */
          ItemCount: number;
        };
        Links: {
          Self: string;
          Next?: string;
          Prev?: string;
        };
      }
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "getFundsConfirmationConsents";
      method: "get";
      expressPath: "/funds-confirmation-consents";
      openapiPath: "/funds-confirmation-consents";
      pathParams?: unknown;
      responses:
        | Paths.GetFundsConfirmationConsents.Responses.$200
        | Paths.GetFundsConfirmationConsents.Responses.$400
        | Paths.GetFundsConfirmationConsents.Responses.$500;
      successResponses: Paths.GetFundsConfirmationConsents.Responses.$200;
      requestBody?: unknown;
      queryParams: Paths.GetFundsConfirmationConsents.QueryParameters;
      headers?: unknown;
    }
    type Route = RequestHandler<
      unknown,
      | Paths.GetFundsConfirmationConsents.Responses.$200
      | Paths.GetFundsConfirmationConsents.Responses.$400
      | Paths.GetFundsConfirmationConsents.Responses.$500,
      unknown,
      Paths.GetFundsConfirmationConsents.QueryParameters
    >;
  }
  namespace GetJobExecution {
    namespace Parameters {
      export type ExecutionId = string;
    }
    export interface PathParameters {
      ExecutionId: Parameters.ExecutionId;
    }
    namespace Responses {
      /**
       * Detailed information on a job execution
       */
      export interface $200 {
        ExecutionId: string;
        JobId: "REFRESH_PENDING_PAYMENTS" | "REFRESH_ACCOUNTS";
        /**
         * Job schedule that triggered the execution. Will be empty if the execution was triggered manually
         */
        ScheduleId?: string;
        /**
         * Timestamp when the execution started
         * example:
         * 2021-01-01T08:00:00Z
         */
        StartDateTime: string;
        /**
         * Timestamp when the execution finished
         * example:
         * 2021-01-01T08:00:00Z
         */
        EndDateTime?: string;
        Result: "In progress" | "Success" | "Failure";
        ExecutionLog?: string[];
        ResultDetails?: string;
      }
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "getJobExecution";
      method: "get";
      expressPath: "/job-executions/:ExecutionId";
      openapiPath: "/job-executions/{ExecutionId}";
      pathParams: Paths.GetJobExecution.PathParameters;
      responses:
        | Paths.GetJobExecution.Responses.$200
        | Paths.GetJobExecution.Responses.$400
        | Paths.GetJobExecution.Responses.$500;
      successResponses: Paths.GetJobExecution.Responses.$200;
      requestBody?: unknown;
      queryParams?: unknown;
      headers?: unknown;
    }
    type Route = RequestHandler<
      Paths.GetJobExecution.PathParameters,
      | Paths.GetJobExecution.Responses.$200
      | Paths.GetJobExecution.Responses.$400
      | Paths.GetJobExecution.Responses.$500,
      unknown,
      unknown
    >;
  }
  namespace GetJobExecutionLog {
    namespace Parameters {
      export type ExecutionId = string;
    }
    export interface PathParameters {
      ExecutionId: Parameters.ExecutionId;
    }
    namespace Responses {
      export type $200 = string;
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "getJobExecutionLog";
      method: "get";
      expressPath: "/job-executions/:ExecutionId/log";
      openapiPath: "/job-executions/{ExecutionId}/log";
      pathParams: Paths.GetJobExecutionLog.PathParameters;
      responses:
        | Paths.GetJobExecutionLog.Responses.$200
        | Paths.GetJobExecutionLog.Responses.$400
        | Paths.GetJobExecutionLog.Responses.$500;
      successResponses: Paths.GetJobExecutionLog.Responses.$200;
      requestBody?: unknown;
      queryParams?: unknown;
      headers?: unknown;
    }
    type Route = RequestHandler<
      Paths.GetJobExecutionLog.PathParameters,
      | Paths.GetJobExecutionLog.Responses.$200
      | Paths.GetJobExecutionLog.Responses.$400
      | Paths.GetJobExecutionLog.Responses.$500,
      unknown,
      unknown
    >;
  }
  namespace GetJobExecutions {
    namespace Parameters {
      export type FromStartDateTime = string;
      export type JobId = ("REFRESH_PENDING_PAYMENTS" | "REFRESH_ACCOUNTS")[];
      export type Page = number;
      export type PageSize = number;
      export type ScheduleId = string[];
      export type ToStartDateTime = string;
    }
    export interface QueryParameters {
      JobId?: Parameters.JobId;
      ScheduleId?: Parameters.ScheduleId;
      FromStartDateTime?: Parameters.FromStartDateTime;
      ToStartDateTime?: Parameters.ToStartDateTime;
      PageSize?: Parameters.PageSize;
      Page?: Parameters.Page;
    }
    namespace Responses {
      export interface $200 {
        Items: {
          ExecutionId: string;
          JobId: "REFRESH_PENDING_PAYMENTS" | "REFRESH_ACCOUNTS";
          /**
           * Job schedule that triggered the execution. Will be empty if the execution was triggered manually
           */
          ScheduleId?: string;
          /**
           * Timestamp when the execution started
           * example:
           * 2021-01-01T08:00:00Z
           */
          StartDateTime: string;
          /**
           * Timestamp when the execution finished
           * example:
           * 2021-01-01T08:00:00Z
           */
          EndDateTime?: string;
          Result: "In progress" | "Success" | "Failure";
        }[];
        /**
         * Information about the results
         */
        Meta: {
          /**
           * Maximum number of results return in a single request
           */
          PageSize: number;
          /**
           * Number of the previous page. If empty, means the current page is the first one
           */
          PreviousPage?: number;
          /**
           * Number of the next page. If empty, means the current page is the last one
           */
          NextPage?: number;
          /**
           * Total number of pages found
           */
          PageCount: number;
          /**
           * Total number of items found
           */
          ItemCount: number;
        };
        Links: {
          Self: string;
          Next?: string;
          Prev?: string;
        };
      }
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "getJobExecutions";
      method: "get";
      expressPath: "/job-executions";
      openapiPath: "/job-executions";
      pathParams?: unknown;
      responses:
        | Paths.GetJobExecutions.Responses.$200
        | Paths.GetJobExecutions.Responses.$400
        | Paths.GetJobExecutions.Responses.$500;
      successResponses: Paths.GetJobExecutions.Responses.$200;
      requestBody?: unknown;
      queryParams: Paths.GetJobExecutions.QueryParameters;
      headers?: unknown;
    }
    type Route = RequestHandler<
      unknown,
      | Paths.GetJobExecutions.Responses.$200
      | Paths.GetJobExecutions.Responses.$400
      | Paths.GetJobExecutions.Responses.$500,
      unknown,
      Paths.GetJobExecutions.QueryParameters
    >;
  }
  namespace GetJobSchedules {
    namespace Parameters {
      export type Page = number;
      export type PageSize = number;
    }
    export interface QueryParameters {
      PageSize?: Parameters.PageSize;
      Page?: Parameters.Page;
    }
    namespace Responses {
      export interface $200 {
        Items: {
          ScheduleId: string;
          JobId: "REFRESH_PENDING_PAYMENTS" | "REFRESH_ACCOUNTS";
          Description?: string;
          /**
           * **Cron** expression that determines when the job should run. The supported format is described [here](https://github.com/harrisiirak/cron-parser)
           */
          ScheduleExpression: string;
          /**
           * Status of the job schedule. Only active jobs will trigger job executions.
           */
          Status: "Active" | "Inactive";
          /**
           * Time when this job will be executed next
           * example:
           * 2021-01-01T08:00:00Z
           */
          NextExecutionDateTime?: string;
          /**
           * Time when this job was executed last
           * example:
           * 2021-01-01T08:00:00Z
           */
          LastExecutionDateTime?: string;
          LastExecutionStatus?: "In progress" | "Success" | "Failure";
          Links: {
            /**
             * Fetches previous executions of this job
             */
            Executions: string;
          };
        }[];
        /**
         * Information about the results
         */
        Meta: {
          /**
           * Maximum number of results return in a single request
           */
          PageSize: number;
          /**
           * Number of the previous page. If empty, means the current page is the first one
           */
          PreviousPage?: number;
          /**
           * Number of the next page. If empty, means the current page is the last one
           */
          NextPage?: number;
          /**
           * Total number of pages found
           */
          PageCount: number;
          /**
           * Total number of items found
           */
          ItemCount: number;
        };
        Links: {
          Self: string;
          Next?: string;
          Prev?: string;
        };
      }
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "getJobSchedules";
      method: "get";
      expressPath: "/job-schedules";
      openapiPath: "/job-schedules";
      pathParams?: unknown;
      responses:
        | Paths.GetJobSchedules.Responses.$200
        | Paths.GetJobSchedules.Responses.$400
        | Paths.GetJobSchedules.Responses.$500;
      successResponses: Paths.GetJobSchedules.Responses.$200;
      requestBody?: unknown;
      queryParams: Paths.GetJobSchedules.QueryParameters;
      headers?: unknown;
    }
    type Route = RequestHandler<
      unknown,
      | Paths.GetJobSchedules.Responses.$200
      | Paths.GetJobSchedules.Responses.$400
      | Paths.GetJobSchedules.Responses.$500,
      unknown,
      Paths.GetJobSchedules.QueryParameters
    >;
  }
  namespace GetPartnerships {
    namespace Parameters {
      export type Modules = "ais" | "pis" | "cbpii" | "cop";
      export type Page = number;
      export type PageSize = number;
    }
    export interface QueryParameters {
      Modules?: Parameters.Modules;
      PageSize?: Parameters.PageSize;
      Page?: Parameters.Page;
    }
    namespace Responses {
      export interface $200 {
        Items: {
          PartnershipId: string;
          CustomerFriendlyName: string;
          CustomerFriendlyLogoUri?: string;
          SupportedModules: ("ais" | "pis" | "cbpii" | "cop")[];
          Links: {
            CreateAccountAccessConsent?: string;
            CreateDomesticPaymentConsent?: string;
            CreateFundsConfirmationConsent?: string;
            ExecuteNameVerificationRequest?: string;
          };
        }[];
        /**
         * Information about the results
         */
        Meta: {
          /**
           * Maximum number of results return in a single request
           */
          PageSize: number;
          /**
           * Number of the previous page. If empty, means the current page is the first one
           */
          PreviousPage?: number;
          /**
           * Number of the next page. If empty, means the current page is the last one
           */
          NextPage?: number;
          /**
           * Total number of pages found
           */
          PageCount: number;
          /**
           * Total number of items found
           */
          ItemCount: number;
        };
        Links: {
          Self: string;
          Next?: string;
          Prev?: string;
        };
      }
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "getPartnerships";
      method: "get";
      expressPath: "/partnerships";
      openapiPath: "/partnerships";
      pathParams?: unknown;
      responses:
        | Paths.GetPartnerships.Responses.$200
        | Paths.GetPartnerships.Responses.$400
        | Paths.GetPartnerships.Responses.$500;
      successResponses: Paths.GetPartnerships.Responses.$200;
      requestBody?: unknown;
      queryParams: Paths.GetPartnerships.QueryParameters;
      headers?: unknown;
    }
    type Route = RequestHandler<
      unknown,
      | Paths.GetPartnerships.Responses.$200
      | Paths.GetPartnerships.Responses.$400
      | Paths.GetPartnerships.Responses.$500,
      unknown,
      Paths.GetPartnerships.QueryParameters
    >;
  }
  namespace InitializeAccountAccessConsent {
    namespace Parameters {
      export type ConsentId = string;
      export type PartnershipId = string;
    }
    export interface PathParameters {
      ConsentId: Parameters.ConsentId;
    }
    export interface QueryParameters {
      PartnershipId: Parameters.PartnershipId;
    }
    export interface RequestBody {}
    namespace Responses {
      export interface $200 {
        ConsentId: string;
        ConsentType: "AccountAccess";
        Partnership?: {
          PartnershipId: string;
          CustomerFriendlyName: string;
          CustomerFriendlyLogoUri?: string;
        };
        Resource: {
          Data: {
            /**
             * Unique identification as assigned to identify the account access consent resource.
             */
            ConsentId: string;
            /**
             * Date and time at which the resource was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            CreationDateTime: string; // date-time
            /**
             * Specifies the status of consent resource in code form.
             */
            Status:
              | "Authorised"
              | "AwaitingAuthorisation"
              | "Rejected"
              | "Revoked";
            /**
             * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            StatusUpdateDateTime: string; // date-time
            Permissions: (
              | "ReadAccountsBasic"
              | "ReadAccountsDetail"
              | "ReadBalances"
              | "ReadBeneficiariesBasic"
              | "ReadBeneficiariesDetail"
              | "ReadDirectDebits"
              | "ReadOffers"
              | "ReadPAN"
              | "ReadParty"
              | "ReadPartyPSU"
              | "ReadProducts"
              | "ReadScheduledPaymentsBasic"
              | "ReadScheduledPaymentsDetail"
              | "ReadStandingOrdersBasic"
              | "ReadStandingOrdersDetail"
              | "ReadStatementsBasic"
              | "ReadStatementsDetail"
              | "ReadTransactionsBasic"
              | "ReadTransactionsCredits"
              | "ReadTransactionsDebits"
              | "ReadTransactionsDetail"
            )[];
            /**
             * Specified date and time the permissions will expire.
             * If this is not populated, the permissions will be open ended.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            ExpirationDateTime?: string; // date-time
            /**
             * Specified start date and time for the transaction query period.
             * If this is not populated, the start date will be open ended, and data will be returned from the earliest available transaction.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            TransactionFromDateTime?: string; // date-time
            /**
             * Specified end date and time for the transaction query period.
             * If this is not populated, the end date will be open ended, and data will be returned to the latest available transaction.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            TransactionToDateTime?: string; // date-time
          };
          /**
           * The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Account Info.
           */
          Risk: unknown;
        };
        /**
         * Tags associated with the resource
         */
        Tags?: string[];
      }
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "initializeAccountAccessConsent";
      method: "patch";
      expressPath: "/account-access-consents/:ConsentId";
      openapiPath: "/account-access-consents/{ConsentId}";
      pathParams: Paths.InitializeAccountAccessConsent.PathParameters;
      responses:
        | Paths.InitializeAccountAccessConsent.Responses.$200
        | Paths.InitializeAccountAccessConsent.Responses.$400
        | Paths.InitializeAccountAccessConsent.Responses.$500;
      successResponses: Paths.InitializeAccountAccessConsent.Responses.$200;
      requestBody: Paths.InitializeAccountAccessConsent.RequestBody;
      queryParams: Paths.InitializeAccountAccessConsent.QueryParameters;
      headers?: unknown;
    }
    type Route = RequestHandler<
      Paths.InitializeAccountAccessConsent.PathParameters,
      | Paths.InitializeAccountAccessConsent.Responses.$200
      | Paths.InitializeAccountAccessConsent.Responses.$400
      | Paths.InitializeAccountAccessConsent.Responses.$500,
      Paths.InitializeAccountAccessConsent.RequestBody,
      Paths.InitializeAccountAccessConsent.QueryParameters
    >;
  }
  namespace InitializeDomesticPaymentConsent {
    namespace Parameters {
      export type ConsentId = string;
      export type PartnershipId = string;
    }
    export interface PathParameters {
      ConsentId: Parameters.ConsentId;
    }
    export interface QueryParameters {
      PartnershipId: Parameters.PartnershipId;
    }
    export interface RequestBody {}
    namespace Responses {
      export interface $200 {
        ConsentId: string;
        ConsentType: "DomesticPayment";
        Resource: {
          Data: {
            /**
             * OB: Unique identification as assigned by the ASPSP to uniquely identify the consent resource.
             */
            ConsentId: string;
            /**
             * Date and time at which the resource was created.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            CreationDateTime: string; // date-time
            /**
             * Specifies the status of consent resource in code form.
             */
            Status:
              | "Authorised"
              | "AwaitingAuthorisation"
              | "Consumed"
              | "Rejected";
            /**
             * Date and time at which the resource status was updated.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            StatusUpdateDateTime: string; // date-time
            /**
             * Specifies to share the refund account details with PISP
             */
            ReadRefundAccount?: "No" | "Yes";
            /**
             * Specified cut-off date and time for the payment consent.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            CutOffDateTime?: string; // date-time
            /**
             * Expected execution date and time for the payment resource.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            ExpectedExecutionDateTime?: string; // date-time
            /**
             * Expected settlement date and time for the payment resource.All dates in the JSON payloads are represented in ISO 8601 date-time format.
             * All date-time fields in responses must include the timezone. An example is below:
             * 2017-04-05T10:43:07+00:00
             */
            ExpectedSettlementDateTime?: string; // date-time
            Charges?: {
              /**
               * Specifies which party/parties will bear the charges associated with the processing of the payment transaction.
               */
              ChargeBearer:
                | "BorneByCreditor"
                | "BorneByDebtor"
                | "FollowingServiceLevel"
                | "Shared";
              /**
               * Charge type, in a coded form.
               */
              Type: string;
              /**
               * Amount of money associated with the charge type.
               */
              Amount: {
                /**
                 * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
                 */
                Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
                /**
                 * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
                 */
                Currency: string; // ^[A-Z]{3,3}$
              };
            }[];
            /**
             * The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor for a single domestic payment.
             */
            Initiation: {
              /**
               * Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction.
               * Usage: the  instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction.
               */
              InstructionIdentification: string;
              /**
               * Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain.
               * Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction.
               * OB: The Faster Payments Scheme can only access 31 characters for the EndToEndIdentification field.
               */
              EndToEndIdentification: string;
              /**
               * User community specific instrument.
               * Usage: This element is used to specify a local instrument, local clearing option and/or further qualify the service or service level.
               */
              LocalInstrument?: string;
              /**
               * Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party.
               * Usage: This amount has to be transported unchanged through the transaction chain.
               */
              InstructedAmount: {
                /**
                 * A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217.
                 */
                Amount: string; // ^\d{1,13}$|^\d{1,13}\.\d{1,5}$
                /**
                 * A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".
                 */
                Currency: string; // ^[A-Z]{3,3}$
              };
              /**
               * Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction.
               */
              DebtorAccount?: {
                /**
                 * Name of the identification scheme, in a coded form as published in an external list.
                 */
                SchemeName: string;
                /**
                 * Identification assigned by an institution to identify an account. This identification is known by the account owner.
                 */
                Identification: string;
                /**
                 * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels.
                 * Note, the account name is not the product name or the nickname of the account.
                 */
                Name?: string;
                /**
                 * This is secondary identification of the account, as assigned by the account servicing institution.
                 * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
                 */
                SecondaryIdentification?: string;
              };
              /**
               * Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction.
               */
              CreditorAccount: {
                /**
                 * Name of the identification scheme, in a coded form as published in an external list.
                 */
                SchemeName: string;
                /**
                 * Identification assigned by an institution to identify an account. This identification is known by the account owner.
                 */
                Identification: string;
                /**
                 * The account name is the name or names of the account owner(s) represented at an account level.
                 * Note, the account name is not the product name or the nickname of the account.
                 * OB: ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory.
                 */
                Name: string;
                /**
                 * This is secondary identification of the account, as assigned by the account servicing institution.
                 * This can be used by building societies to additionally identify accounts with a roll number (in addition to a sort code and account number combination).
                 */
                SecondaryIdentification?: string;
              };
              /**
               * Information that locates and identifies a specific address, as defined by postal services.
               */
              CreditorPostalAddress?: {
                /**
                 * Identifies the nature of the postal address.
                 */
                AddressType?:
                  | "Business"
                  | "Correspondence"
                  | "DeliveryTo"
                  | "MailTo"
                  | "POBox"
                  | "Postal"
                  | "Residential"
                  | "Statement";
                /**
                 * Identification of a division of a large organisation or building.
                 */
                Department?: string;
                /**
                 * Identification of a sub-division of a large organisation or building.
                 */
                SubDepartment?: string;
                /**
                 * Name of a street or thoroughfare.
                 */
                StreetName?: string;
                /**
                 * Number that identifies the position of a building on a street.
                 */
                BuildingNumber?: string;
                /**
                 * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
                 */
                PostCode?: string;
                /**
                 * Name of a built-up area, with defined boundaries, and a local government.
                 */
                TownName?: string;
                /**
                 * Identifies a subdivision of a country such as state, region, county.
                 */
                CountrySubDivision?: string;
                /**
                 * Nation with its own government.
                 */
                Country?: string; // ^[A-Z]{2,2}$
                AddressLine?: string[];
              };
              /**
               * Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system.
               */
              RemittanceInformation?: {
                /**
                 * Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form.
                 */
                Unstructured?: string;
                /**
                 * Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction.
                 * Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money.
                 * If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification.
                 * OB: The Faster Payments Scheme can only accept 18 characters for the ReferenceInformation field - which is where this ISO field will be mapped.
                 */
                Reference?: string;
              };
              /**
               * Additional information that can not be captured in the structured fields and/or any other specific block.
               */
              SupplementaryData?: unknown;
            };
            /**
             * The authorisation type request from the TPP.
             */
            Authorisation?: {
              /**
               * Type of authorisation flow requested.
               */
              AuthorisationType: "Any" | "Single";
              /**
               * Date and time at which the requested authorisation flow must be completed.All dates in the JSON payloads are represented in ISO 8601 date-time format.
               * All date-time fields in responses must include the timezone. An example is below:
               * 2017-04-05T10:43:07+00:00
               */
              CompletionDateTime?: string; // date-time
            };
            /**
             * Supporting Data provided by TPP, when requesting SCA Exemption.
             */
            SCASupportData?: {
              /**
               * This field allows a PISP to request specific SCA Exemption for a Payment Initiation
               */
              RequestedSCAExemptionType?:
                | "BillPayment"
                | "ContactlessTravel"
                | "EcommerceGoods"
                | "EcommerceServices"
                | "Kiosk"
                | "Parking"
                | "PartyToParty";
              /**
               * Specifies a character string with a maximum length of 40 characters.
               * Usage: This field indicates whether the PSU was subject to SCA performed by the TPP
               */
              AppliedAuthenticationApproach?: "CA" | "SCA";
              /**
               * Specifies a character string with a maximum length of 140 characters.
               * Usage: If the payment is recurring then the transaction identifier of the previous payment occurrence so that the ASPSP can verify that the PISP, amount and the payee are the same as the previous occurrence.
               */
              ReferencePaymentOrderId?: string;
            };
            /**
             * Set of elements used to identify a person or an organisation.
             */
            Debtor?: {
              /**
               * The account name is the name or names of the account owner(s) represented at an account level, as displayed by the ASPSP's online channels. Note, the account name is not the product name or the nickname of the account.
               */
              Name?: string;
            };
          };
          /**
           * The Risk section is sent by the initiating party to the ASPSP. It is used to specify additional details for risk scoring for Payments.
           */
          Risk: {
            /**
             * Specifies the payment context
             */
            PaymentContextCode?:
              | "BillPayment"
              | "EcommerceGoods"
              | "EcommerceServices"
              | "Other"
              | "PartyToParty";
            /**
             * Category code conform to ISO 18245, related to the type of services or goods the merchant provides for the transaction.
             */
            MerchantCategoryCode?: string;
            /**
             * The unique customer identifier of the PSU with the merchant.
             */
            MerchantCustomerIdentification?: string;
            /**
             * Information that locates and identifies a specific address, as defined by postal services or in free format text.
             */
            DeliveryAddress?: {
              AddressLine?: string[];
              /**
               * Name of a street or thoroughfare.
               */
              StreetName?: string;
              /**
               * Number that identifies the position of a building on a street.
               */
              BuildingNumber?: string;
              /**
               * Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.
               */
              PostCode?: string;
              /**
               * Name of a built-up area, with defined boundaries, and a local government.
               */
              TownName: string;
              /**
               * Identifies a subdivision of a country such as state, region, county.
               */
              CountrySubDivision?: string;
              /**
               * Nation with its own government, occupying a particular territory.
               */
              Country: string; // ^[A-Z]{2,2}$
            };
          };
        };
        Partnership?: {
          PartnershipId: string;
          CustomerFriendlyName: string;
          CustomerFriendlyLogoUri?: string;
        };
        /**
         * Tags associated with the resource
         */
        Tags?: string[];
      }
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "initializeDomesticPaymentConsent";
      method: "patch";
      expressPath: "/domestic-payment-consents/:ConsentId";
      openapiPath: "/domestic-payment-consents/{ConsentId}";
      pathParams: Paths.InitializeDomesticPaymentConsent.PathParameters;
      responses:
        | Paths.InitializeDomesticPaymentConsent.Responses.$200
        | Paths.InitializeDomesticPaymentConsent.Responses.$400
        | Paths.InitializeDomesticPaymentConsent.Responses.$500;
      successResponses: Paths.InitializeDomesticPaymentConsent.Responses.$200;
      requestBody: Paths.InitializeDomesticPaymentConsent.RequestBody;
      queryParams: Paths.InitializeDomesticPaymentConsent.QueryParameters;
      headers?: unknown;
    }
    type Route = RequestHandler<
      Paths.InitializeDomesticPaymentConsent.PathParameters,
      | Paths.InitializeDomesticPaymentConsent.Responses.$200
      | Paths.InitializeDomesticPaymentConsent.Responses.$400
      | Paths.InitializeDomesticPaymentConsent.Responses.$500,
      Paths.InitializeDomesticPaymentConsent.RequestBody,
      Paths.InitializeDomesticPaymentConsent.QueryParameters
    >;
  }
  namespace InitiateAccountAccessAuth {
    namespace Parameters {
      export type ConsentId = string;
    }
    export interface PathParameters {
      ConsentId: Parameters.ConsentId;
    }
    export interface RequestBody {
      RedirectUri: string;
    }
    namespace Responses {
      export interface $201 {
        /**
         * ID of the consent being authorised
         */
        ConsentId: string;
        /**
         * Redirect URL used to complete the authorisation
         */
        AuthUrl: string;
        /**
         * Random generated string that uniquely identifies the authorisation request
         */
        AuthState: string;
        RedirectUri: string;
      }
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "initiateAccountAccessAuth";
      method: "post";
      expressPath: "/account-access-consents/:ConsentId/auth";
      openapiPath: "/account-access-consents/{ConsentId}/auth";
      pathParams: Paths.InitiateAccountAccessAuth.PathParameters;
      responses:
        | Paths.InitiateAccountAccessAuth.Responses.$201
        | Paths.InitiateAccountAccessAuth.Responses.$400
        | Paths.InitiateAccountAccessAuth.Responses.$500;
      successResponses: Paths.InitiateAccountAccessAuth.Responses.$201;
      requestBody: Paths.InitiateAccountAccessAuth.RequestBody;
      queryParams?: unknown;
      headers?: unknown;
    }
    type Route = RequestHandler<
      Paths.InitiateAccountAccessAuth.PathParameters,
      | Paths.InitiateAccountAccessAuth.Responses.$201
      | Paths.InitiateAccountAccessAuth.Responses.$400
      | Paths.InitiateAccountAccessAuth.Responses.$500,
      Paths.InitiateAccountAccessAuth.RequestBody,
      unknown
    >;
  }
  namespace InitiateDomesticPaymentAuth {
    namespace Parameters {
      export type ConsentId = string;
    }
    export interface PathParameters {
      ConsentId: Parameters.ConsentId;
    }
    export interface RequestBody {
      RedirectUri: string;
    }
    namespace Responses {
      export interface $201 {
        /**
         * ID of the consent being authorised
         */
        ConsentId: string;
        /**
         * Redirect URL used to complete the authorisation
         */
        AuthUrl: string;
        /**
         * Random generated string that uniquely identifies the authorisation request
         */
        AuthState: string;
        RedirectUri: string;
      }
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "initiateDomesticPaymentAuth";
      method: "post";
      expressPath: "/domestic-payment-consents/:ConsentId/auth";
      openapiPath: "/domestic-payment-consents/{ConsentId}/auth";
      pathParams: Paths.InitiateDomesticPaymentAuth.PathParameters;
      responses:
        | Paths.InitiateDomesticPaymentAuth.Responses.$201
        | Paths.InitiateDomesticPaymentAuth.Responses.$400
        | Paths.InitiateDomesticPaymentAuth.Responses.$500;
      successResponses: Paths.InitiateDomesticPaymentAuth.Responses.$201;
      requestBody: Paths.InitiateDomesticPaymentAuth.RequestBody;
      queryParams?: unknown;
      headers?: unknown;
    }
    type Route = RequestHandler<
      Paths.InitiateDomesticPaymentAuth.PathParameters,
      | Paths.InitiateDomesticPaymentAuth.Responses.$201
      | Paths.InitiateDomesticPaymentAuth.Responses.$400
      | Paths.InitiateDomesticPaymentAuth.Responses.$500,
      Paths.InitiateDomesticPaymentAuth.RequestBody,
      unknown
    >;
  }
  namespace InitiateFundsConfirmationAuth {
    namespace Parameters {
      export type ConsentId = string;
    }
    export interface PathParameters {
      ConsentId: Parameters.ConsentId;
    }
    export interface RequestBody {
      RedirectUri: string;
    }
    namespace Responses {
      export interface $201 {
        /**
         * ID of the consent being authorised
         */
        ConsentId: string;
        /**
         * Redirect URL used to complete the authorisation
         */
        AuthUrl: string;
        /**
         * Random generated string that uniquely identifies the authorisation request
         */
        AuthState: string;
        RedirectUri: string;
      }
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "initiateFundsConfirmationAuth";
      method: "post";
      expressPath: "/funds-confirmation-consents/:ConsentId/auth";
      openapiPath: "/funds-confirmation-consents/{ConsentId}/auth";
      pathParams: Paths.InitiateFundsConfirmationAuth.PathParameters;
      responses:
        | Paths.InitiateFundsConfirmationAuth.Responses.$201
        | Paths.InitiateFundsConfirmationAuth.Responses.$400
        | Paths.InitiateFundsConfirmationAuth.Responses.$500;
      successResponses: Paths.InitiateFundsConfirmationAuth.Responses.$201;
      requestBody: Paths.InitiateFundsConfirmationAuth.RequestBody;
      queryParams?: unknown;
      headers?: unknown;
    }
    type Route = RequestHandler<
      Paths.InitiateFundsConfirmationAuth.PathParameters,
      | Paths.InitiateFundsConfirmationAuth.Responses.$201
      | Paths.InitiateFundsConfirmationAuth.Responses.$400
      | Paths.InitiateFundsConfirmationAuth.Responses.$500,
      Paths.InitiateFundsConfirmationAuth.RequestBody,
      unknown
    >;
  }
  namespace UpdateJobSchedule {
    namespace Parameters {
      export type ScheduleId = string;
    }
    export interface PathParameters {
      ScheduleId: Parameters.ScheduleId;
    }
    export interface RequestBody {
      Description?: string;
      /**
       * **Cron** expression that determines when the job should run. The supported format is described [here](https://github.com/harrisiirak/cron-parser)
       */
      ScheduleExpression?: string;
      /**
       * Status of the job schedule. Only active jobs will trigger job executions.
       */
      Status?: "Active" | "Inactive";
    }
    namespace Responses {
      export interface $200 {
        ScheduleId: string;
        JobId: "REFRESH_PENDING_PAYMENTS" | "REFRESH_ACCOUNTS";
        Description?: string;
        /**
         * **Cron** expression that determines when the job should run. The supported format is described [here](https://github.com/harrisiirak/cron-parser)
         */
        ScheduleExpression: string;
        /**
         * Status of the job schedule. Only active jobs will trigger job executions.
         */
        Status: "Active" | "Inactive";
        /**
         * Time when this job will be executed next
         * example:
         * 2021-01-01T08:00:00Z
         */
        NextExecutionDateTime?: string;
        /**
         * Time when this job was executed last
         * example:
         * 2021-01-01T08:00:00Z
         */
        LastExecutionDateTime?: string;
        LastExecutionStatus?: "In progress" | "Success" | "Failure";
        Links?: {
          /**
           * Fetches previous executions of this job
           */
          Executions: string;
        };
      }
      export interface $400 {
        message?: string;
      }
      export interface $500 {
        message?: string;
      }
    }
    interface Config {
      operationId: "updateJobSchedule";
      method: "put";
      expressPath: "/job-schedules/:ScheduleId";
      openapiPath: "/job-schedules/{ScheduleId}";
      pathParams: Paths.UpdateJobSchedule.PathParameters;
      responses:
        | Paths.UpdateJobSchedule.Responses.$200
        | Paths.UpdateJobSchedule.Responses.$400
        | Paths.UpdateJobSchedule.Responses.$500;
      successResponses: Paths.UpdateJobSchedule.Responses.$200;
      requestBody: Paths.UpdateJobSchedule.RequestBody;
      queryParams?: unknown;
      headers?: unknown;
    }
    type Route = RequestHandler<
      Paths.UpdateJobSchedule.PathParameters,
      | Paths.UpdateJobSchedule.Responses.$200
      | Paths.UpdateJobSchedule.Responses.$400
      | Paths.UpdateJobSchedule.Responses.$500,
      Paths.UpdateJobSchedule.RequestBody,
      unknown
    >;
  }
}
