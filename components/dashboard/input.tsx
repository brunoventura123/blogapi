import styles from './styles.module.css'
type Props = {
    type: string
    label: string
    multiple?: boolean
    name?: string
    value?: string
    onChange: (newValue: string) => void
}

export const Input = ({ type, label, multiple, name, value, onChange }: Props) => {
    return (
        <div className={styles.areaInput}>
            <input
                type={type}
                placeholder={label}
                multiple={multiple}
                style={{ display: multiple ? 'none' : 'block' }}
                id={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}