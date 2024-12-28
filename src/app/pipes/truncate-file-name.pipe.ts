import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncateFileName'
})
export class TruncateFileNamePipe implements PipeTransform {
    transform(value: string, maxLength: number = 20): string {
        if (!value) {
            return '';
        }

        // Dividir el nombre por espacios
        const words = value.split(' ');

        // Si la primera palabra es más corta que la longitud máxima permitida, devolverla
        if (words[0].length <= maxLength) {
            return words[0];
        }

        // Si el nombre es muy largo, devolver solo la primera palabra truncada
        return words[0].substring(0, maxLength) + '...';
    }
}
