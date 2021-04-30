/* TDD: Test Driven Development
    se hacen los test primero y después se tratan de superar
    es decir, luego de los test se crea la funcionalidad
    Se recomienda para cuando se entiende a la perfección
    la lógica de negocio que se va a usar */

function buildMessage(entity, action) {
    if(action === 'list') {
        return `${entity}s ${action}ed`;
    }
    return `${entity} ${action}d`;
}

module.exports = buildMessage;