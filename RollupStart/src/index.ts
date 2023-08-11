let names: string = 'hale最开心ss';
console.log(names)
if (process.env.NODE_ENV === 'development') {
    alert('开发')
} else {
    alert('生产')
}
console.log(process.env.NODE_ENV)


