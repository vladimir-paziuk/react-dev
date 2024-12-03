import {useState, useEffect, memo} from 'react'

const getData = () => [
    {
        id: 1,
        value: 'Math',
    },
    {
        id: 2,
        value: 'Bob',
    },
    {
        id: 3,
        value: 'Bryan',
    }
];

const Item = ({data}) => {
    const { value } = data;

    console.log('Item render with value', value);

    useEffect(() => {
        console.log('Item mount with value', value);

        return () => {
            console.log('Item unmount with value', value);
        };
    }, [value]);

    return <li>{value}</li>;
};

const RenderItem = Item;
// const RenderItem = memo(Item);

export const LoopKey = () => {
    // console.log('App render');

    const [counter, setCounter] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log('App mount');

        setData(getData());

        return () => {
            console.log('App unmount');
        };
    }, []);

    const incrementCounter = () => {
        setCounter(counter + 1)
    };

    const onSort = () => {
        const sorted = [...data].sort((a, b) => a.value.localeCompare(b.value));
        setData(sorted);
    };

    const onRemove = () => {
        // const slised = data.slice(0, -1);
        const slised = data.slice(1, data.length);
        setData(slised);
    };

    const changeId = () => {
        const copy = [...data];
        copy[1].id = copy[1].id >= 7 ? copy[1].id + 1 : 7;
        setData(copy);
    };

    const append = () => {
        setData([...data, { id: 9990, value: 'Bob append'}]);
    };

    const prepend = () => {
        setData([{ id: 9991, value: 'Bob prepend'}, ...data]);
    };

    return (
        <div key={counter}>
            {counter}
            <ul>
                {data.map((item, index) => (
                    <RenderItem key={item.id} data={item}/>
                ))}
            </ul>
            <button onClick={incrementCounter}>change root key</button>
            <button onClick={onSort}>sort</button>
            <button onClick={onRemove}>remove</button>
            <button onClick={changeId}>change id</button>
            <button onClick={append}>append</button>
            <button onClick={prepend}>prepend</button>
        </div>
    )
}
