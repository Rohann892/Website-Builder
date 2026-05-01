export const getCurrentUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(400).json({
                success: false,
                message: 'authentication failed and user not found'
            })
        }

        return res.status(200).json({
            success: true,
            user: req.user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Get current User error, ${error}`
        })
    }
}