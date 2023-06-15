// verifica se usuário é admin 

function isAdmin(req, res, next){
    if(!req.user.admin) {
        return res.status(401).send('Permissão negada!');
    }

    return next()
}

module.exports = isAdmin