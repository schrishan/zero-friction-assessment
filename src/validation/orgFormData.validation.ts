export const validateField = (fieldName: string, value: string | boolean) => {
    switch (fieldName) {
        case "migrationMode":
            return typeof value === "boolean" && value === true
                ? ""
                : "Migration mode is required";
            break;
        case "code":
            return value.toString().length === 0
                ? "Code is required"
                : "";
            break;
        case "description":
            return value.toString().length === 0
                ? "Description is required"
                : "";
            break;
        case "bankAccount":
            return value.toString().length === 0
                ? "Bank account number is required"
                : "";
            break;
        case "vatAccountNumber":
            return value.toString().length === 0
                ? "Vat account number is required"
                : "";
            break;
        case "companyAccountNumber":
            return value.toString().length === 0
                ? "Company account number is required"
                : "";
            break;
        case "streetName":
            return value.toString().length === 0
                ? "Street Name is required"
                : "";
            break;
        case "streetNumber":
            return value.toString().length === 0
                ? "Street number number is required"
                : /^[0-9\b]+$/.test(value as string)
                    ? ""
                    : "Invalid street number number";
            break;
            case "postalCode":
            return value.toString().length === 0
                ? "Postal code number is required"
                : /^[0-9\b]+$/.test(value as string)
                    ? ""
                    : "Invalid postal code number";
            break;
        case "city":
            return value.toString().length === 0
                ? "City is required"
                : "";
            break;
        case "country":
            return value.toString().length === 0
                ? "Country is required"
                : "";
            break;
        case "emailAddress":
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string)
                ? ""
                : "Invalid email format";
            break;
        case "telephone":
            return value.toString().length === 0
                ? "Telephone number is required"
                : value.toString().length > 11
                    ? "Telephone number should not exceed 11 digits"
                    : value.toString().length < 10
                        ? "Telephone number should not be less than 10 digits"
                        : /^[0-9\b]+$/.test(value as string)
                            ? ""
                            : "Invalid telephone number";
            break;
        case "website":
            return value.toString().length === 0
                ? "Website URL is required"
                : /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[^ "]+$/.test(value as string)
                    ? ""
                    : "Invalid website URL format";
            break;
        default:
            return "";
            break;
    }
};



