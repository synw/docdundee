from docdundee.docparser import (
    parse_docstrings,
    parse_functions,
    write_docstrings,
)


def parse_funcs():
    alt = parse_functions("docdundee.docparser")
    doc = parse_docstrings(alt)
    # print(doc)
    write_docstrings("../../docsite/src/assets/doc/api/docstrings.json", doc, 4)

    inter = parse_functions("docdundee.interfaces")
    doc = parse_docstrings(inter)
    write_docstrings("../../docsite/src/assets/doc/types/docstrings.json", doc, 4)


def main():
    parse_funcs()


if __name__ == "__main__":
    main()
