const { User } = require('../models/users.model')

exports.getAllUsers = async ( req, res) => {
    try {
        const user = await User.findAll({
            where: {status: 'active'} 
        })

        //if(user.length === 0){
        //console.log(user);
        if(user.length === 0){
            res.status(400).json({
                status: 'error',
                message: 'There are not users until'
            })
            return
        }

        res.status(201).json({
            status: 'success',
            data: {
                user
            }
        })
    } catch (error) {
        console.log(error);
    }
}