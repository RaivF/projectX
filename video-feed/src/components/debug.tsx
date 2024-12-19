type Props = {
	//тут any только из за того, что это компонент нужен только для разработки
	data: any
}

export function Debug(props: Props) {
	return <div style={{ position: "fixed", right: 0, top: 0, backgroundColor: "#ccc" }}>{JSON.stringify(props.data)}</div>
}
