// themeName: name of the theme
// styles: key-value pair
//          key: name of css variable to be referenced in css files
//          value: css values to be stored
export interface Theme{
    themeName: string,
    styles: any;
}

export enum ThemeMode {
    DARK, LIGHT
}