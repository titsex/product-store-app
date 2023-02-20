import { BadRequestException, ValidationError } from '@nestjs/common'

export function transformValidationErrors(errors: ValidationError[]) {
    const result = []

    for (const error of errors) {
        if (Object.keys(error.constraints).length === 1) result.push(Object.values(error.constraints)[0])
        else {
            const constraints = Object.values(error.constraints)
            let message = `${error.property}${constraints[0].replace(error.property, '')}`

            for (let i = 1; i < constraints.length; i++) {
                if (i + 1 === constraints.length) message += ` and${constraints[i].replace(error.property, '')}`
                else message += `,${constraints[i].replace(error.property, '')}`
            }

            result.push(message)
        }
    }

    return new BadRequestException(result)
}
