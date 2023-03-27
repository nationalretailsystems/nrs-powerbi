export function regexService() {
    let regex = {
        password: /^.{2,}$/,
        stringNotEmpty: /[^ ]/,
        date: /^\d{4}-\d{2}-\d{2}$/
    };

    return regex;
}
