/**
 * @typedef SupplierDTO
 * @property {string} rfc - RFC del proveedor.
 * @property {string} razon_social - Nombre del proveedor.
 * @property {string} domicilio - Domicilio del proveedor.
 * @property {string} correo_electronico - Correo electrónico del proveedor.
 * @property {string} telefono - Teléfono del proveedor.
 * @property {string} cuenta_bancaria - Número de cuenta bancaria del proveedor.
 */
const supplier = {};

/**
 * @typedef CustomerDTO
 * @property {string} id - id del cliente.
 * @property {string} nombre - Nombre del cliente.
 * @property {string} primer_apellido - Apellido paterno del cliente.
 * @property {string} [segundo_apellido] - Apellido materno del cliente.
 * @property {string} telefono - Teléfono del cliente.
 * @property {string} domicilio - Domicilio del cliente.
 * @property {string} fecnac - Fecha de nacimiento del cliente.
 * @property {string} edonac - Estado de nacimiento del cliente.
 * @property {string} sexo - Sexo del del cliente, debe de tener los valores H ó M.
 * @property {string} nacorigen - Nacionalidad de origen del cliente.
 * @property {string} edo - Estado en el que reside el cliente.
 * @property {string} mun - Municipio en el que reside el cliente.
 * @property {string} loc - Localidad en la que resie el cliente.
 * @property {string} [contpaq_id] - ID de CONTPAQ del cliente. Actualmente se encuentra en desuso.
 */
const customer = {}

/**
 * @typedef ExamDTO
 * @property {string} cliente - id del cliente.
 * @property {string} fecha - Fecha del examen.
 * @property {number} dp_od - Valor de dioptrías del ojo derecho.
 * @property {number} dp_oi - Valor de dioptrías del ojo izquierdo.
 * @property {number} oblea - Valor de la oblea.
 * @property {number} lejos_od_esferico - Valor esférico para la visión lejana del ojo derecho.
 * @property {number} lejos_od_cilindrico - Valor cilíndrico para la visión lejana del ojo derecho.
 * @property {number} lejos_od_eje - Valor del eje para la visión lejana del ojo derecho.
 * @property {number} lejos_od_agudeza_visual - Valor de la agudeza visual para la visión lejana del ojo derecho.
 * @property {number} lejos_oi_esferico - Valor esférico para la visión lejana del ojo izquierdo.
 * @property {number} lejos_oi_cilindrico - Valor cilíndrico para la visión lejana del ojo izquierdo.
 * @property {number} lejos_oi_eje - Valor del eje para la visión lejana del ojo izquierdo.
 * @property {number} lejos_oi_agudeza_visual - Valor de la agudeza visual para la visión lejana del ojo izquierdo.
 * @property {number} adicion_od_esferico - Valor esférico adicional para el ojo derecho.
 * @property {number} adicion_oi_esferico - Valor esférico adicional para el ojo izquierdo.
 * @property {string} tipo_lentes - Tipo de lentes utilizados.
 * @property {string} observaciones - Observaciones adicionales.
 */
const exam = {}

/**
 * @typedef EmployeeDTO
 * @property {string} rfc - RFC del empleado.
 * @property {string} nombre - Nombre del empleado.
 * @property {string} primer_apellido - Primer apellido del empleado.
 * @property {string} segundo_apellido - Segundo apellido del empleado.
 * @property {string} username - Nombre de usuario del empleado.
 * @property {string} [password] - Contraseña del empleado (opcional).
 * @property {string} privilegios - Privilegios del empleado.
 */
const employee = {}

module.exports = {
    supplier,
    customer,
    exam,
    employee
}
