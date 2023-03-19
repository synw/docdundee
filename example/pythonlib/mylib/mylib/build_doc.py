from docdundee.docparser import (
    parse_docstrings,
    parse_class,
    parse_functions,
    write_docstrings,
)


def parse_code():
    # requests
    print("Processing pandas DataFrame")
    ds = parse_class("pandas.core.frame", "DataFrame", "init")
    doc = parse_docstrings(ds)
    write_docstrings("./docsite/public/doc/3.dataframe/docstrings.json", doc, 4)
    # pandas
    print("Processing requests")
    ds2 = parse_functions("requests.api", "init")
    doc2 = parse_docstrings(ds2, True)
    write_docstrings("./docsite/public/doc/2.requests/docstrings.json", doc2, 4)
    # my lib
    print("Processing mylib")
    ds3 = parse_functions("mylib.utils")
    doc3 = parse_docstrings(ds3, exec_examples=True)
    write_docstrings("./docsite/public/doc/1.mylib/docstrings.json", doc3, 4)
    print("done")


def main():
    parse_code()


if __name__ == "__main__":
    main()
