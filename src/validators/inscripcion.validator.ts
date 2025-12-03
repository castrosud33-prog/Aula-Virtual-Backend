import { body } from 'express-validator';

export const inscripcionValidators = [
  body('n_codcur')
    .isInt({ min: 1 })
    .withMessage('El código de curso debe ser un número válido'),

  body('v_nombres')
    .trim()
    .notEmpty()
    .withMessage('Los nombres son obligatorios')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage('Los nombres solo pueden contener letras'),

  body('v_apepaterno')
    .trim()
    .notEmpty()
    .withMessage('El apellido paterno es obligatorio')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage('El apellido paterno solo puede contener letras'),

  body('v_apematerno')
    .trim()
    .notEmpty()
    .withMessage('El apellido materno es obligatorio')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage('El apellido materno solo puede contener letras'),

  body('v_tipodoc')
    .isIn(['DNI', 'CE', 'PTP'])
    .withMessage('El tipo de documento debe ser DNI, CE o PTP'),

  body('v_nrodoc')
    .trim()
    .notEmpty()
    .withMessage('El número de documento es obligatorio')
    .custom((value, { req }) => {
      const tipodoc = req.body.v_tipodoc;
      if (tipodoc === 'DNI') {
        if (!/^\d{8}$/.test(value)) {
          throw new Error('El DNI debe tener 8 dígitos numéricos');
        }
      } else {
        if (!/^[a-zA-Z0-9]{8,20}$/.test(value)) {
          throw new Error('El CE/PTP debe tener entre 8 y 20 caracteres alfanuméricos');
        }
      }
      return true;
    }),

  body('d_fechanac')
    .isDate()
    .withMessage('La fecha de nacimiento debe ser válida')
    .custom((value) => {
      const fechaNac = new Date(value);
      const hoy = new Date();
      const edad = hoy.getFullYear() - fechaNac.getFullYear();
      const mes = hoy.getMonth() - fechaNac.getMonth();
      
      if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
        if (edad - 1 < 18) {
          throw new Error('Debe ser mayor de 18 años');
        }
      } else if (edad < 18) {
        throw new Error('Debe ser mayor de 18 años');
      }
      return true;
    }),

  body('n_codocu')
    .isInt({ min: 1 })
    .withMessage('El código de ocupación debe ser un número válido'),

  body('v_departamento')
    .trim()
    .notEmpty()
    .withMessage('El departamento es obligatorio'),

  body('v_provincia')
    .trim()
    .notEmpty()
    .withMessage('La provincia es obligatoria'),

  body('v_distrito')
    .trim()
    .notEmpty()
    .withMessage('El distrito es obligatorio'),

  body('v_email')
    .trim()
    .isEmail()
    .withMessage('Debe ser un email válido')
    .matches(/@gmail\.com$/)
    .withMessage('El email debe ser del dominio @gmail.com'),

  body('n_numtelf')
    .trim()
    .matches(/^9\d{8}$/)
    .withMessage('El teléfono debe tener 9 dígitos y comenzar con 9'),

  body('v_autoriza')
    .isIn(['S', 'N'])
    .withMessage('La autorización debe ser S o N')
];