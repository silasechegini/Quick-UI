## Version History Summary

This changelog covers the rapid development and stabilization of the Quick-UI React component library from November 16-18, 2025. The project is scheduled to go through several iterations to establish proper build tooling, CSS handling, and type safety:

- [1.0.1] - 2025-11-16: Initial release with basic functionality
- [1.0.2] - 2025-11-17, [1.0.3] - 2025-11-17: Build system improvements and CSS compilation fixes
- [1.0.4] - 2025-11-18: Major enhancement focusing on type safety and Storybook configuration
- [1.0.5] - 2025-11-18: Final polish with conflict resolution and cleanup

### Key Improvements Across Versions

1. **Build System Evolution**: Migrated from tsup to vite for better CSS handling and bundling
2. **Type Safety Enhancement**: Systematic replacement of string literals with TypeScript enums across all components
3. **Developer Experience**: Improved Storybook configuration with proper TypeScript path resolution
4. **Documentation**: Comprehensive README updates with accurate installation and usage instructions
5. **Code Quality**: Enhanced component typing patterns and consistent enum usage

### Components Enhanced

- Accordion, Avatar, Badge, Button, Card, Chip, ComboBox, Flyout, Footer, Header, Icon, Input, Modal, MultiSelect, Page, ProgressBar, Radio, Slider, Switch, Toggle

### Technical Infrastructure

- **Build**: Vite-based build system with proper CSS extraction
- **Testing**: Jest and Vitest configuration
- **Documentation**: Storybook with TypeScript support and path mapping
- **Type Safety**: Comprehensive enum-based typing system
- **Styling**: SCSS-based styling with proper bundling and export configuration

---

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.5] - 2025-11-18

### Fixed

- Fixed conflicting typing in Accordion component
- Resolved type conflicts in Accordion.types.ts

### Removed

- Removed unnecessary zip file (quick-ui-react-1.0.1.tgz) from repository

## [1.0.4] - 2025-11-17

### Changed

- **Component Typing**: Made component typing more robust by introducing enums for component props instead of string literals across multiple components ([#57](https://github.com/silasechegini/Quick-UI/pull/57))
  - Introduced enums with uppercase snake case naming (e.g., `INPUT_VARIANTS`, `TOGGLE_SIZES`)
  - Replaced string literal types with enum-derived type aliases
  - Updated component implementations to use enum values
  - Reorganized type definition files for better structure

- **Storybook Configuration**: Enhanced component configurations by replacing string literal values with enum constants ([#56](https://github.com/silasechegini/Quick-UI/pull/56))
  - Replaced string literals with enum constants (`BADGE_VARIANTS`, `BADGE_SIZES`, `BADGE_POSITIONS`, `BADGE_TYPES`, `AVATAR_VARIANTS`, `AVATAR_SIZES`, `AVATAR_SHAPES`, `BUTTON_VARIANTS`) across story files
  - Added TypeScript configuration for Storybook with proper path resolution
  - Enhanced main.ts with vite-tsconfig-paths plugin

- Updated README.md with corrected information
- Removed success stories section from README ([#55](https://github.com/silasechegini/Quick-UI/pull/55))
- Updated stories for Button, Chip, Flyout, Header, Input, Page, Slider, and Toggle components with proper enum usage
- Improved type safety across DebouncedInput stories

## [1.0.3] - 2025-11-16

### Fixed

- **Build System Migration**: Complete migration from tsup to vite for better CSS handling ([#54](https://github.com/silasechegini/Quick-UI/pull/54))
  - Fixed compilation issue where styles were not being applied to components
  - Added proper CSS export configuration in package.json
  - Updated documentation to include CSS import instructions
  - Removed redundant SCSS @import statements from component files
  - Added TypeScript declarations for CSS imports

### Changed

- Updated README.md with comprehensive setup instructions
- Added CSS import examples for consumers
- Updated bundle size information
- Improved Storybook rendering configuration
- Fixed import strategy for component styles
- Added configurations to apply styles in consumer packages

## [1.0.2] - 2025-11-16

### Changed

- Updated build configuration for better CSS bundling
- Enhanced Storybook main.ts configuration
- Updated package dependencies

### Fixed

- Fixed tsup configuration issues
- Improved CSS publishing pipeline

## [1.0.1] - 2025-11-16

### Added

- Initial stable release
- Added SCSS to CSS bundling support
- Added CSS publishing configuration
- Initial tsup configuration for building
- Basic Storybook setup
- Package configuration for npm publishing

---

[1.0.5]: https://github.com/silasechegini/Quick-UI/compare/v1.0.4...v1.0.5
[1.0.4]: https://github.com/silasechegini/Quick-UI/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/silasechegini/Quick-UI/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/silasechegini/Quick-UI/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/silasechegini/Quick-UI/releases/tag/v1.0.1
