export const newBody = (hashpassword, body, otp) => {
    const newbody = {
        name: body.name,
        username: body.username,
        email: body.email,
        password: hashpassword,
        otp: otp,
        verify: false
    }

    return newbody;
}