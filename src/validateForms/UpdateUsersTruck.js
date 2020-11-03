

function UpdateUsersTruck(form) {
    const {
        name,
        email,
        password,
        isNewPassword,
        telefone,
        dateOfBirth,
        bankNumber,
        typeBank,
        agency,
        account,
        nameAccount,
        accountCPF,
        vehicleModel,
        vehiclePlate,
        numberRNTRC,
        bodywork,
        bodyworkType,
        numberCNH,
    } = form;
    if (!email) {
        return { message: 'error', res: 'Missing the email' }
    }
    if (!isNewPassword) {
        return { message: 'error', res: 'Missing the isNewPassword' }
    }
    if (!name) {
        return { message: 'error', res: 'Missing the name' }
    }
    if (!telefone) {
        return { message: 'error', res: 'Missing the telephone' }
    }
    if (!dateOfBirth) {
        return { message: 'error', res: 'Missing the dateOfBirth' }
    }
    if (!bankNumber) {
        return { message: 'error', res: 'Missing the bankNumber' }
    }
    if (!typeBank) {
        return { message: 'error', res: 'Missing the typeBank' }
    }
    if (!agency) {
        return { message: 'error', res: 'Missing the agency' }
    }
    if (!account) {
        return { message: 'error', res: 'Missing the account' }
    }
    if (!nameAccount) {
        return { message: 'error', res: 'Missing the nameAccount' }
    }
    if (!accountCPF) {
        return { message: 'error', res: 'Missing the accountCPF' }
    }
    if (!vehicleModel) {
        return { message: 'error', res: 'Missing the vehicleModel' }
    }
    if (!vehiclePlate) {
        return { message: 'error', res: 'Missing the vehiclePlate' }
    }
    if (!numberRNTRC) {
        return { message: 'error', res: 'Missing the numberRNTRC' }
    }
    if (!bodywork) {
        return { message: 'error', res: 'Missing the bodywork' }
    }
    if (!bodyworkType) {
        return { message: 'error', res: 'Missing the bodyworkType' }
    }
    if (!numberCNH) {
        return { message: 'error', res: 'Missing the numberCNH' }
    }
    return { message: 'success', res: 'Missing the numberCNH' }
}
module.exports = UpdateUsersTruck;